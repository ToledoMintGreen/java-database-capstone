## MySQL Database Design

### Table: patients 
- id: INT, Primary Key, Auto Increment 
- name: VARCHAR(40), Not Null 
- date_of_birth: DATE 

### Table: doctors 
- id: INT, Primary Key, Auto Increment 
- name: VARCHAR(40), Not Null 
- specialisation: ENUM('General Medicine', 'Cardiology','Neurology', 'Pediatrics‘), Not Null

### Table: appointments 
- id: INT, Primary Key, Auto Increment 
- doctor_id: INT, Foreign Key → doctors(id), ON DELETE CASCADE
- patient_id: INT, Foreign Key → patients(id), ON DELETE CASCADE
- appointment_time: DATETIME, Not Null - status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled) 


### Table: admin 
- id: INT, Primary Key, Auto Increment - username: VARCHAR(40), Not Null, Unique
- password_hash: VARCHAR(255), Not Null - can_create_doctors: BOOLEAN, Default: True
- can_delete_doctors: BOOLEAN, Default: True
- can_run_procedures: BOOLEAN, Default: False


## MongoDB Collection Design 

### Collection: prescriptions 
```json 
{ 
  "_id": "ObjectId('64abc123456')",                      
  "patientName": "John Smith",   "appointmentId": 51,   "medication": "Paracetamol",   "dosage": "500mg",   "doctorNotes": "Take 1 tablet every 6 hours.", 
  "refillCount": 2, 
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street"
  },

  "tags": ["pain-relief", "fever", "over-the-counter"],

  "metadata“: {
    "issuedAt": "2026-02-08T09:30:00Z",
    "expiresAt": "2026-02-15T09:30:00Z"
    "created_by": „Doctor_ID_2"
  } 
} 
```


### Collection: feedback 
```json { 
  "_id": "64abc123456",  
  "appointmentId": 51,                    
  "patientId": 2,
  "doctorId": 4,
  "doctorRatings": {
    "punctuality": 5,
    "friendliness": 5,
    "helpfulness": 3,
    "empathy": 3
  },
  "comment": "Doctor recommendable“,
  "metadata": {
    "createdAt": "2026-01-01T09:30:00Z",
    "visibility": "private_to_doctor"
}
