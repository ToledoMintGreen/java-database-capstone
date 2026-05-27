// doctorCard.js



/* Import the overlay function for booking appointments from loggedPatient.js */
/* Import the deleteDoctor API function to remove doctors (admin role) from doctorServices.js */ 
/* Import function to fetch patient details (used during booking) from patientServices.js */

import { showBookingOverlay } from "../components/loggedPatient.js";
import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";

/* Function to create and return a DOM element for a single doctor card */

export function createDoctorCard(doctor) {
	/* Create the main container for the doctor card */ 
	const card = document.createElement("div");  
	card.classList.add("doctor-card");

	/* Retrieve the current user role from localStorage */
	const role = localStorage.getItem("userRole"); 	


	/* Create a div to hold doctor information */
	const infoDiv = document.createElement("div"); 
	infoDiv.classList.add("doctor-info");
	
     /* Nested container */
	const name = document.createElement("h3"); 
	
	name.textContent = doctor.name; 
	specialization.textContent = doctor.specialization; 
	mail.textContent = doctor.email; 
	availability.textContent = Array.isArray(doctor.availableTimes) 
        ? doctor.availableTimes.join(", ") 
        : doctor.availableTimes;
	
	infoDiv.appendChild(name); 
	infoDiv.appendChild(specialization); 
	infoDiv.appendChild(email); 
	infoDiv.appendChild(availability);


	const actionsDiv = document.createElement("div");
	actionsDiv.classList.add("card-actions");




	/* === ADMIN ROLE ACTIONS === */
	/* Add a delete button only for admins. */
	/* A new <div> to hold buttons like “Delete” */
	/* Attach an event click handler for delete button */
	/* 	1. Confirm deletion */
	/* 	2. Get token from localStorage */
	/* 	3. Call API to delete */
	/* 	4. On success: remove the card from the DOM */
	/* Add delete button to actions container */


	if (role === "admin") {
		const removeBtn = document.createElement("button"); 
		removeBtn.textContent = "Delete";
		removeBtn.addEventListener("click", async () => { 
			const token = localStorage.getItem("token");
			try {
   				const response = await fetch(`https://api.beispiel.de{doctor.id}`, {
            			method: 'DELETE',
            			headers: {
               			 'Authorization': `Bearer ${token}`,
             			      'Content-Type': 'application/json'
          				  }
       			});
			     if (response.ok) {
            			alert("Arzt erfolgreich gelöscht.");
           			card.remove();
        			} else {
            			const errorData = await response.json();
            			alert(`Fehler beim Löschen: ${errorData.message}`);
       				}
    			} catch (error) {
        			console.error("Netzwerkfehler:", error);
        			alert("Ein Fehler ist aufgetreten. Bitte erneut versuchen.");
    			}
			console.log("Doctor deleted");
        	});
        	actionsDiv.appendChild(removeBtn);
	}

   
    /* === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===  */
    /*  Create a book now button */
    /*  Alert patient to log in before booking  */
    /*  Add button to actions container */

	else if (role === "patient") {
		const bookNow = document.createElement("button"); 
		bookNow.textContent = "Book Now"; 
		bookNow.addEventListener("click", () => {
			alert("Patient needs to login first."); });
		});
          actionsDiv.appendChild(bookNow);
	}


      /* === LOGGED-IN PATIENT ROLE ACTIONS === */
      /* Create a book now button */
      /* Handle booking logic for logged-in patient */ 
      /*   Redirect if token not available */
      /*   Fetch patient data with token */
      /*   Show booking overlay UI with doctor and patient info */ 
      /* Add button to actions container */ 


	else if (role === "loggedPatient") {
		const bookNow = document.createElement("button"); 
		bookNow.textContent = "Book Now"; 
		bookNow.addEventListener("click", async (e) => {
			const token = localStorage.getItem("token"); 
			const patientData = await getPatientData(token); 
			showBookingOverlay(e, doctor, patientData);
		}); 
		actionsDiv.appendChild(bookNow);
		}


	/* Append doctor info and action buttons to the car */ 
  	/* Return the complete doctor card element	*/  
	
	card.appendChild(infoDiv); 
	card.appendChild(actionsDiv);



	/* Return the final card: 	**/

	return card;
}



  


    



  






