package com.project.back_end.controllers;
import com.project.back_end.services.AppointmentService;
import com.project.back_end.services.Service;
import com.project.back_end.models.Appointment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

// 1. Set Up the Controller Class:
//    - Annotate the class with `@RestController` to define it as a REST API controller.
//    - Use `@RequestMapping("/appointments")` to set a base path for all appointment-related endpoints.
//    - This centralizes all routes that deal with booking, updating, retrieving, and canceling appointments.

    private final AppointmentService appointmentService;
    private final Service service;

// 2. Autowire Dependencies:
//    - Inject `AppointmentService` for handling the business logic specific to appointments.
//    - Inject the general `Service` class, which provides shared functionality like token validation and appointment checks.


    public AppointmentController(AppointmentService appointmentService, Service service) {
        this.appointmentService = appointmentService;
        this.service = service;
    }

// 3. Define the `getAppointments` Method:
//    - Handles HTTP GET requests to fetch appointments based on date and patient name.
//    - Takes the appointment date, patient name, and token as path variables.
//    - First validates the token for role `"doctor"` using the `Service`.
//    - If the token is valid, returns appointments for the given patient on the specified date.
//    - If the token is invalid or expired, responds with the appropriate message and status code.


    @GetMapping("/get/{date}/{patientName}/{token}")
    public ResponseEntity<Object> getAppointments(
            @PathVariable Long doctorId,
            @PathVariable LocalDateTime start,
            @PathVariable LocalDateTime end,
            @PathVariable String patientName, 
            @PathVariable String token) {

        if (!service.validateToken(token, "doctor")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or expired.");
        }

        String nameFilter = "null".equals(patientName) ? null : patientName;

        return ResponseEntity.ok(appointmentService.getAppointments(doctorId, start, end, nameFilter));


    }


// 4. Define the `bookAppointment` Method:
//    - Handles HTTP POST requests to create a new appointment.
//    - Accepts a validated `Appointment` object in the request body and a token as a path variable.
//    - Validates the token for the `"patient"` role.
//    - Uses service logic to validate the appointment data (e.g., check for doctor availability and time conflicts).
//    - Returns success if booked, or appropriate error messages if the doctor ID is invalid or the slot is already taken.


    @PostMapping("/book/{token}")
    public ResponseEntity<String> bookAppointment(
	@RequestBody Appointment appointment, 
	@PathVariable String token) {

        if (!service.validateToken(token, "patient")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token or expired.");
        }


        LocalDateTime startTime = appointment.getAppointmentTime();

        LocalDateTime endTime = startTime.plusHours(1);


        int validation = service.validateAppointment(
                    appointment.getDoctor().getId(),
                    startTime,
                    endTime,
                    startTime.toLocalTime()
        );

       if (validation == -1) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found.");
       if (validation == 0) return ResponseEntity.status(HttpStatus.CONFLICT).body("Time booked.");

       int result = appointmentService.bookAppointment(appointment);
            return result == 1
                    ? ResponseEntity.status(HttpStatus.CREATED).body("Appointment booked successfully.")
                    : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Booking failed.");
    }

// 5. Define the `updateAppointment` Method:
//    - Handles HTTP PUT requests to modify an existing appointment.
//    - Accepts a validated `Appointment` object and a token as input.
//    - Validates the token for `"patient"` role.
//    - Delegates the update logic to the `AppointmentService`.
//    - Returns an appropriate success or failure response based on the update result.

    @PutMapping("/update/{token}")
    public ResponseEntity<String> updateAppointment(@RequestBody Appointment appointment, @PathVariable String token) {

        if (!service.validateToken(token, "patient")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not successful.");
        }


        Long patientId = appointment.getPatient().getId();

        String response = appointmentService.updateAppointment(appointment.getId(), appointment, patientId);

        if (response.startsWith("Error")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        return ResponseEntity.ok(response);
    }

// 6. Define the `cancelAppointment` Method:
//    - Handles HTTP DELETE requests to cancel a specific appointment.
//    - Accepts the appointment ID and a token as path variables.
//    - Validates the token for `"patient"` role to ensure the user is authorized to cancel the appointment.
//    - Calls `AppointmentService` to handle the cancellation process and returns the result.

    @DeleteMapping("/cancel/{appointmentId}/{token}")
    public ResponseEntity<String> cancelAppointment(
            @PathVariable Long appointmentId,
            @PathVariable Long patientId,
            @PathVariable String token) {

        if (!service.validateToken(token, "patient")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Cancelling not permitted.");
        }

        boolean deleted = appointmentService.cancelAppointment(appointmentId, patientId);

        return deleted
                ? ResponseEntity.ok("Appointment successfully been cancelled.")
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cancelling unsuccessful.");
    }


}
