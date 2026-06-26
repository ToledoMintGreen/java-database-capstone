package com.project.back_end.services;

import com.project.back_end.models.Appointment;
import com.project.back_end.repo.AppointmentRepository;
import com.project.back_end.repo.PatientRepository;
import com.project.back_end.repo.DoctorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.time.LocalDate;


@Service 
public class AppointmentService {
// 1. **Add @Service Annotation**:
//    - To indicate that this class is a service layer class for handling business logic.
//    - The `@Service` annotation should be added before the class declaration to mark it as a Spring service component.
//    - Instruction: Add `@Service` above the class definition.

    private final AppointmentRepository appointmentRepository;
    private final TokenService tokenService;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;


// 2. **Constructor Injection for Dependencies**:
//    - The `AppointmentService` class requires several dependencies like `AppointmentRepository`, `Service`, `TokenService`, `PatientRepository`, and `DoctorRepository`.
//    - These dependencies should be injected through the constructor.
//    - Instruction: Ensure constructor injection is used for proper dependency management in Spring.

public AppointmentService(AppointmentRepository appointmentRepository, 
                              TokenService tokenService, 
                              PatientRepository patientRepository, 
                              DoctorRepository doctorRepository)
 {
        this.appointmentRepository = appointmentRepository;
        this.tokenService = tokenService;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
       
    }


// 3. **Add @Transactional Annotation for Methods that Modify Database**:
//    - The methods that modify or update the database should be annotated with `@Transactional` to ensure atomicity and consistency of the operations.
//    - Instruction: Add the `@Transactional` annotation above methods that interact with the database, especially those modifying data.

// 4. **Book Appointment Method**:
//    - Responsible for saving the new appointment to the database.
//    - If the save operation fails, it returns `0`; otherwise, it returns `1`.
//    - Instruction: Ensure that the method handles any exceptions and returns an appropriate result code.

    @Transactional 
    public int bookAppointment(Appointment appointment) {
        try {
            appointmentRepository.save(appointment);
            return 1;
        } catch (Exception e) {
            // Log e.getMessage();
            return 0;
        }
    }


// 5. **Update Appointment Method**:
//    - This method is used to update an existing appointment based on its ID.
//    - It validates whether the patient ID matches, checks if the appointment is available for updating, and ensures that the doctor is available at the specified time.
//    - If the update is successful, it saves the appointment; otherwise, it returns an appropriate error message.
//    - Instruction: Ensure proper validation and error handling is included for appointment updates.

 @Transactional
    public String updateAppointment(Long appointmentId, Appointment updatedDetails, Long patientId) {
        return appointmentRepository.findById(appointmentId).map(appointment -> {

            if (!appointment.getPatient().getId().equals(patientId)) {
                return "Error: Patient ID not found.";
            }

            if (!appointment.getAppointmentTime().equals(updatedDetails.getAppointmentTime())) {


                java.time.LocalDateTime startTime = updatedDetails.getAppointmentTime();
                java.time.LocalDateTime endTime = startTime.plusHours(1);

                // Holt alle Termine aus der Datenbank und filtert sie in Java
                List<Appointment> allAppointments = appointmentRepository.findAll();

                LocalDateTime newStart = updatedDetails.getAppointmentTime();
                LocalDateTime newEnd = newStart.plusHours(1);

                boolean isDoctorBusy = allAppointments.stream()

                        .filter(app -> app.getDoctor().getId().equals(updatedDetails.getDoctor().getId()))

                        .anyMatch(app -> !app.getAppointmentTime().isBefore(newStart) && app.getAppointmentTime().isBefore(newEnd));

                if (isDoctorBusy) {
                    return "Error: Doctor is not avaliable.";
                }
            }

            appointment.setAppointmentTime(updatedDetails.getAppointmentTime());
            if (updatedDetails.getDoctorNotes() != null) {
                appointment.setDoctorNotes(updatedDetails.getDoctorNotes());
            }


            appointmentRepository.save(appointment);
            return "Appointment updated successfully.";

        }).orElse("Error: Appointment not found.");
    }



// 6. **Cancel Appointment Method**:
//    - This method cancels an appointment by deleting it from the database.
//    - It ensures the patient who owns the appointment is trying to cancel it and handles possible errors.
//    - Instruction: Make sure that the method checks for the patient ID match before deleting the appointment.

  @Transactional
    public boolean cancelAppointment(Long appointmentId, Long patientId) {
        return appointmentRepository.findById(appointmentId).map(appointment -> {
            if (appointment.getPatient().getId().equals(patientId)) {
                appointmentRepository.delete(appointment);
                return true;
            }
            return false;
        }).orElse(false);
    }


// 7. **Get Appointments Method**:
//    - This method retrieves a list of appointments for a specific doctor on a particular day, optionally filtered by the patient's name.
//    - It uses `@Transactional` to ensure that database operations are consistent and handled in a single transaction.
//    - Instruction: Ensure the correct use of transaction boundaries, especially when querying the database for appointments.

@Transactional(readOnly = true)
    public List<Appointment> getAppointments(Long doctorId, LocalDateTime start, LocalDateTime end, String patientName) {
        if (patientName != null && !patientName.isEmpty()) {
            return appointmentRepository.findByDoctorIdAndPatient_NameContainingIgnoreCaseAndAppointmentTimeBetween(doctorId, patientName, start, end);
        }
        return appointmentRepository.findByDoctorIdAndAppointmentTimeBetween(doctorId, start, end);
    }


// 8. **Change Status Method**:
//    - This method updates the status of an appointment by changing its value in the database.
//    - It should be annotated with `@Transactional` to ensure the operation is executed in a single transaction.
//    - Instruction: Add `@Transactional` before this method to ensure atomicity when updating appointment status.

@Transactional
    public void changeStatus(Long appointmentId, int newStatus) {
        appointmentRepository.findById(appointmentId).ifPresent(appointment -> {
            appointment.setStatus(newStatus);
            appointmentRepository.save(appointment);
        });
    }
}
