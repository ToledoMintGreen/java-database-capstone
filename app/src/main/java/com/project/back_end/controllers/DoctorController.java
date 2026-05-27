package com.project.back_end.controllers;


import com.project.back_end.services.DoctorService;
import com.project.back_end.services.Service; // Falls deine "Service"-Klasse so heißt
import com.project.back_end.services.TokenService;
import com.project.back_end.models.Doctor;
import com.project.back_end.DTO.Login;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;




@RestController
@RequestMapping("${api.path}doctor") 
public class DoctorController {

// 1. Set Up the Controller Class:
//    - Annotate the class with `@RestController` to define it as a REST controller that serves JSON responses.
//    - Use `@RequestMapping("${api.path}doctor")` to prefix all endpoints with a configurable API path followed by "doctor".
//    - This class manages doctor-related functionalities such as registration, login, updates, and availability.

    private final DoctorService doctorService;
    private final Service service;
  private final TokenService tokenService; 


// 2. Autowire Dependencies:
//    - Inject `DoctorService` for handling the core logic related to doctors (e.g., CRUD operations, authentication).
//    - Inject the shared `Service` class for general-purpose features like token validation and filtering.

    public DoctorController(DoctorService doctorService, Service service, TokenService tokenService) {
        this.doctorService = doctorService;
        this.service = service;
    this.tokenService = tokenService;

    }

// 3. Define the `getDoctorAvailability` Method:
//    - Handles HTTP GET requests to check a specific doctor’s availability on a given date.
//    - Requires `user` type, `doctorId`, `date`, and `token` as path variables.
//    - First validates the token against the user type.
//    - If the token is invalid, returns an error response; otherwise, returns the availability status for the doctor.

@GetMapping("/availability/{user}/{doctorId}/{date}/{token}")
    public ResponseEntity<Object> getDoctorAvailability(
            @PathVariable String user, 
            @PathVariable Long doctorId, 
            @PathVariable LocalDateTime start,
            @PathVariable LocalDateTime end,
            @PathVariable String token) {
        
        if (!tokenService.validateToken(token, user)) { 
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token for: " + user);
        }
        
        List<String> availability = doctorService.getDoctorAvailability(doctorId, start, end);
        return ResponseEntity.ok(availability);
    }



// 4. Define the `getDoctor` Method:
//    - Handles HTTP GET requests to retrieve a list of all doctors.
//    - Returns the list within a response map under the key `"doctors"` with HTTP 200 OK status.

@GetMapping("/all")
    public ResponseEntity<Map<String, List<Doctor>>> getDoctor() {
        Map<String, List<Doctor>> response = new HashMap<>();
        response.put("doctors", doctorService.getDoctors());
        return ResponseEntity.ok(response);
    }


// 5. Define the `saveDoctor` Method:
//    - Handles HTTP POST requests to register a new doctor.
//    - Accepts a validated `Doctor` object in the request body and a token for authorization.
//    - Validates the token for the `"admin"` role before proceeding.
//    - If the doctor already exists, returns a conflict response; otherwise, adds the doctor and returns a success message.

@PostMapping("/register/{token}")
    public ResponseEntity<String> saveDoctor(@RequestBody Doctor doctor, @PathVariable String token) {
        if (!tokenService.validateToken(token, "admin")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Your need to be an admin.");
        }

        int result = doctorService.saveDoctor(doctor);
        if (result == -1) return ResponseEntity.status(HttpStatus.CONFLICT).body("Doctor already exists.");
        return result == 1 
            ? ResponseEntity.status(HttpStatus.CREATED).body("Doctor successfulla registered")
            : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving.");
    }


// 6. Define the `doctorLogin` Method:
//    - Handles HTTP POST requests for doctor login.
//    - Accepts a validated `Login` DTO containing credentials.
//    - Delegates authentication to the `DoctorService` and returns login status and token information.

 @PostMapping("/login")
    public ResponseEntity<Object> doctorLogin(@RequestBody Login login) {
        String token = doctorService.validateDoctor(login.getEmail(), login.getPassword());
        if ("Invalid credentials".equals(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(token);
        }
        return ResponseEntity.ok(Map.of("token", token));
    }


// 7. Define the `updateDoctor` Method:
//    - Handles HTTP PUT requests to update an existing doctor's information.
//    - Accepts a validated `Doctor` object and a token for authorization.
//    - Token must belong to an `"admin"`.
//    - If the doctor exists, updates the record and returns success; otherwise, returns not found or error messages.


@PutMapping("/update/{token}")
    public ResponseEntity<String> updateDoctor(@RequestBody Doctor doctor, @PathVariable String token) {
        if (!tokenService.validateToken(token, "admin")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authorized.");
        }

        int result = doctorService.updateDoctor(doctor);
        return result == 1 
            ? ResponseEntity.ok("Sucessfully updated.") 
            : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found.");
    }

// 8. Define the `deleteDoctor` Method:
//    - Handles HTTP DELETE requests to remove a doctor by ID.
//    - Requires both doctor ID and an admin token as path variables.
//    - If the doctor exists, deletes the record and returns a success message; otherwise, responds with a not found or error message.

 @DeleteMapping("/delete/{doctorId}/{token}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long doctorId, @PathVariable String token) {
        if (!tokenService.validateToken(token, "admin")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Admin: Access denied.");
        }

        int result = doctorService.deleteDoctor(doctorId);
        return result == 1 
            ? ResponseEntity.ok("Doctor and appointment could not get deleted.") 
            : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor could not get deleted.");
    }


// 9. Define the `filter` Method:
//    - Handles HTTP GET requests to filter doctors based on name, time, and specialty.
//    - Accepts `name`, `time`, and `speciality` as path variables.
//    - Calls the shared `Service` to perform filtering logic and returns matching doctors in the response.

  @GetMapping("/filter/{name}/{time}/{speciality}")
    public ResponseEntity<List<Doctor>> filter(
            @PathVariable String name, 
            @PathVariable String time, 
            @PathVariable String speciality) {
        

        String n = "null".equals(name) ? null : name;
        String t = "null".equals(time) ? null : time;
        String s = "null".equals(speciality) ? null : speciality;

        return ResponseEntity.ok(service.filterDoctor(n, s, t));
    }



}
