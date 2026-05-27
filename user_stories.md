# User Story Template
**Title:**
_As a [user role], I want [feature/goal], so that [reason]._ 

**Acceptance Criteria:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]

**Priority:** [High/Medium/Low]

**Story Points:** [Estimated Effort in Points]

**Notes:**
- No additional information or edge cases.


# Admin User Stories
## Log into the portal with your username and password to manage the platform securely
**Title:**
_As an admin, I want to log into the portal with your username and password, so that I can manage the platform securely._ 

**Acceptance Criteria:**
1. Admin has a username and password
2. Admin logged in successfully to the platform with the credentials
3. Admin can see that he has the rights to manage the platform

**Priority:** High

**Story Points:** 8

**Notes:**
- Admin checks that Doctor has no rights to manage the platform, Admin has the management rights to create and delete users.


## Log out of the portal to protect system access
**Title:**
_As an admin, I want to log out of the portal, so that I can protect the platform access _ 
**Acceptance Criteria:**
1. Admin can select log out from the portal as a logged in user
2. Admin has verification that he has been logged out
3. Admin cannot access the platform anymore, i.e. the page formerly visited as logged in user

**Priority:** Low

**Story Points:** 3

**Notes:**
- No additional information or edge cases.


## Add doctors to the portal 
**Title:**
_As an admin, I can manage users on the platform, so that I can add doctors to it._ 

**Acceptance Criteria:**
1. Admin can select manage users from the portal as a logged in user
2. Admin can add doctors to the platform
3. Admin can see that added doctors are successfully created on the platform

**Priority:** Medium

**Story Points:** 5

**Notes:**
- No additional information or edge cases.


## Delete doctor's profile from the portal 
**Title:**
_As an admin, I can manage users on the platform, so that I can delete doctors to it._ 

**Acceptance Criteria:**
1. Admin can select manage users from the portal as a logged in user]
2. Admin can delete doctors to the platform]
3. Admin can see that deleted doctors are deleted on the platform while the non deleted remain on the platform

**Priority:** Low**

Story Points:** 3

**Notes:**
- No additional information or edge cases.


## Run a stored procedure in MySQL CLI to get the number of appointments per month and track usage statistics 
**Title:**
_As an admin, I can run a stored procedure in MySQL on the platform, so that I can get the number of appointments per month and track usage statistics._ 

**Acceptance Criteria:**
1. Admin can run a stored procedure in MySQL as a logged in user
2. Admin gets the correct number of appointments per month after successful completion of the procedure
3. Admin gets the correct usage statistics per month after successful completion of the procedure

**Priority:** Medium

**Story Points:** 8

**Notes:**
- Admin has rights to run stored procedure and the needed stored procedures have been created in MySQL already.


# Patient User Stories
## View a list of doctors without logging in to explore options before registering
**Title:**
_As a patient, I want to view a list of doctors without logging in, so that I can explore options for available doctors before registering._ 

**Acceptance Criteria:**
1. Patient can successfully navigate to a section that shows the doctors on the platform without logging in
2. Patient can see the registered doctors on the platform without logging in
3. Patient can see the registered doctors as a list 
**Priority:** Low

**Story Points:** 3 
**Notes:**
- Admin has to create doctors beforehand against which are checked as present on the platform.

## Sign up using your email and password to book appointments
**Title:**
_As a patient, I can sign up to the platform using email and password, so that I can book appointments with doctors._ 

**Acceptance Criteria:**
1. Patient can successfully navigate to a section to make appointments with available doctors after logging in successfully with username and password]
2. Patient has successfully booked appointments with an available doctor
3. Patient has successfully booked appointments with another available doctor

**Priority:** High 
**Story Points:** 8

**Notes:**
- Doctors have been created that are available on default weekdays from 9 to 5, those who have marked their availability, and all bookable appointments need to be in future.


## Log into the portal to manage your bookings
**Title:**
_As a patient, I want to log into the portal with your username and password, so that I can manage my bookings with doctors._ 

**Acceptance Criteria:**
1. Patient can successfully navigate to a section to change appointments with available doctors after logging in successfully with username and password
2. Patient can change booked appointments with an available doctor
3. Patient can change booked appointments with another available doctor 

**Priority:** Low

**Story Points:** 3

**Notes:**
- Doctors have been created that are available on default weekdays from 9 to 5, those who have marked their availability, and all bookable appointments need to be in future.


## Log out of the portal to secure your account  
**Title:**
_As a patient, I want to log out of the portal, so that I can secure my account._ 

**Acceptance Criteria:**
1. Patient can select log out from the portal as a logged in user
2. Patient has verification that he has been logged out
3. Patient cannot access the appointments anymore 
**Priority:** Low

**Story Points:** 3

**Notes:**
- No additional information or edge cases

## Log in and book an hour-long appointment to consult with a doctor 
 **Title:**
_As a patient, I want to book an hour-long appointment as logged in user, so that I can consult with a doctor_ 

**Acceptance Criteria:**
 1. Patient can successfully navigate to a section to make 1 hour appointments with available doctors after logging in successfully with username and password
 2. Patient can see 1 hour appointments with an available doctor
 3. Patient can successfully book 1 hour appointments with an available doctor

**Priority:** Low

**Story Points:** 3

**Notes:**
- Doctors have been created that are available on default weekdays from 9 to 5 for 15 minutes, those marked their availability for 1 hour appointment, and all bookable appointments need to be in future.


## View my upcoming appointments so that I can prepare accordingly 
**Title:**
_As a patient, I want to view upcoming appointments, so that I can prepare accordingly._ 

**Acceptance Criteria:**
1. Patient can successfully navigate to a section to view upcoming appointments with available doctors after logging in successfully with username and password
2. Patient can see upcoming appointments with doctors
3. Patient cannot see past appointments with doctors in that section
  
**Priority:** Medium

**Story Points:** 5

**Notes:**
- No additional information or edge cases.


# Doctors User Stories
## Log into the portal to manage your appointments 
 **Title:**
_As a doctor, I want to manage their availability and appointments as logged in user, so that I can manage your appointments._ 
 
**Acceptance Criteria:**
1. Doctor can successfully navigate to a section to manage availability and appointments after logging in successfully with username and password
2. Patient can change availability on specific dates as available and unavailable
3. Patient can select time frame and types of appointments for bookable appointments with patients
 
**Priority:** Medium
  
**Story Points:** 5
  
**Notes:**
- Doctors can select hourly availabilty from 0-24 hours, the selection for time slots applies to all future weekdays, another selection can be made that applies for all future weekends.


## Log out of the portal to protect my data 
**Title:** _As a doctor, I want to log out of the portal, so that I can protect my data._ 

**Acceptance Criteria:**
1. Doctor can select log out from the portal as a logged in user
2. Doctor has verification that he has been logged out
3. Doctor cannot access the appointments anymore

**Priority:** Low

**Story Points:** 3

**Notes:**
- Additional information or edge cases 


## View my appointment calendar to stay organized 
**Title:**
_As a doctor, I want to view my appointment calendar, so that I can stay organized._

**Acceptance Criteria:**
1. Doctor can successfully navigate to a section to view appointments calendar after logging in successfully with username and password
2. Patient can see view future appointments calendar in that section
3. Patient cannot see view past appointments calendar in that section

**Priority:** Medium
 
**Story Points:** 5
 
**Notes:**
 - The appointment calendar view is shown for the current week on default with appointments listed, and they can navigate to the next week.


## Mark your unavailability to inform patients only the available slots 
**Title:**
_As a doctor, I want to mark your unavailability, so that patients are informed  only about the available slots._ 

**Acceptance Criteria:**
1. Doctor can successfully navigate to a section to administer availability for appointments after logging in successfully with username and password
2. Patient can see view their future availability in that section]
3. Patient can change future availability for time slots on all future weekdays and weekends separately in that section

**Priority:** Medium

**Story Points:** 5

**Notes:**
- Doctors can mark single unavailable slots for selected dates and time slots in future separately.


## Update your profile with specialization and contact information so that patients have up-to-date information 
**Title:**
_As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._

**Acceptance Criteria:**
1. Doctors can successfully navigate to a section to manage their profile after logging in successfully with username and password
2. Doctors can update their profile with specialization and contact information
3. Patient can  see the updated profile in upcoming appointments section and when booking a new appointment
 
**Priority:** Medium
  
**Story Points:** 3 
**Notes:**
- Doctors have a predefined list of specialisations and contact information have to contain adress and phone number.


## View the patient details for upcoming appointments so that I can be prepared 
**Title:**
_As a doctor, I want view the patient details for upcoming appointments, so that I can be prepared._ 

**Acceptance Criteria:**
1. Doctors can successfully navigate to a section to view the patients with upcoming appointment after logging in successfully with username and password
2. Doctors can view the patient details for upcoming appointments
3. Doctors can see the latest patient details for upcoming appointments]

**Priority:** Medium

**Story Points:** 3

**Notes:**
- Patients have to give predefined details on default like name, gender, birthdate, insurance type, reason for appointment, new or editiert patient as well as time and date of appointment.
