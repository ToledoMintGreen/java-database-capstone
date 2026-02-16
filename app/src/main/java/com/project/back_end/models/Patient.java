package com.project.back_end.models;


@Entity
public class Patient {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
	private Long id;
    @NotNull
    @Size(min = 3, max = 100)
    private String name;
    @Email
    @NotNull
    private String email;
    @Size(min = 6)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) 
	private String password;
    @Pattern(regexp = "\\d{10}")
    private String phone;
	// Add additional fields	
    // For Patient: Add dateOfBirth, emergencyContact, or insuranceProvider
	// Use @Past for dateOfBirth to ensure dates are in the past
	// Use @Pattern to validate phone numbers with a specific format (done before)
	@Past
      private LocalDate dateOfBirth;
	@Size(min = 3, max = 50)
	private String emergencyContact;
	@Size(min = 3, max = 50)
	private String insuranceProvider;

	// Getters and setters

	public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public LocalDate dateOfBirth() {
        return dateOfBirth;
    }
    public void set dateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
	public String emergencyContact() {
        return emergencyContact;
    }
    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }
	public String insuranceProvider() {
        return rating;
    }
    public void setInsuranceProvider(String insuranceProvider) {
        this.insuranceProvider = insuranceProvider;
    }
} 





// @Entity annotation:
//    - Marks the class as a JPA entity, meaning it represents a table in the database.
//    - Required for persistence frameworks (e.g., Hibernate) to map the class to a database table.

// 1. 'id' field:
//    - Type: private Long
//    - Description:
//      - Represents the unique identifier for each patient.
//      - The @Id annotation marks it as the primary key.
//      - The @GeneratedValue(strategy = GenerationType.IDENTITY) annotation auto-generates the ID value when a new record is inserted into the database.

// 2. 'name' field:
//    - Type: private String
//    - Description:
//      - Represents the patient's full name.
//      - The @NotNull annotation ensures that the patient's name is required.
//      - The @Size(min = 3, max = 100) annotation ensures that the name length is between 3 and 100 characters. 
//      - Provides validation for correct input and user experience.


// 3. 'email' field:
//    - Type: private String
//    - Description:
//      - Represents the patient's email address.
//      - The @NotNull annotation ensures that an email address must be provided.
//      - The @Email annotation validates that the email address follows a valid email format (e.g., patient@example.com).

// 4. 'password' field:
//    - Type: private String
//    - Description:
//      - Represents the patient's password for login authentication.
//      - The @NotNull annotation ensures that a password must be provided.
//      - The @Size(min = 6) annotation ensures that the password must be at least 6 characters long.

// 5. 'phone' field:
//    - Type: private String
//    - Description:
//      - Represents the patient's phone number.
//      - The @NotNull annotation ensures that a phone number must be provided.
//      - The @Pattern(regexp = "^[0-9]{10}$") annotation validates that the phone number must be exactly 10 digits long.

// 6. 'address' field:
//    - Type: private String
//    - Description:
//      - Represents the patient's address.
//      - The @NotNull annotation ensures that the address must be provided.
//      - The @Size(max = 255) annotation ensures that the address does not exceed 255 characters in length, providing validation for the address input.


// 7. Getters and Setters:
//    - Standard getter and setter methods are provided for all fields: id, name, email, password, phone, and address.
//    - These methods allow access and modification of the fields of the Patient class.

  

}
