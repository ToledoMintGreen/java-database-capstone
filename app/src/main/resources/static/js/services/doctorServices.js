// doctorServices.js



/*
  Import the base API URL from the config file
  Define a constant DOCTOR_API to hold the full endpoint for doctor-related actions
*/

import { API_BASE_URL } from "../config/config.js";
const DOCTOR_API = API_BASE_URL + '/doctor'

/*
  Function: getDoctors
  Purpose: Fetch the list of all doctors from the API

   Use fetch() to send a GET request to the DOCTOR_API endpoint
   Convert the response to JSON
   Return the 'doctors' array from the response
   If there's an error (e.g., network issue), log it and return an empty array
*/

export async function getDoctors() {
  try {
    const response = await fetch(`${DOCTOR_API}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    if (!response.ok) {
      throw new Error(`Error with status: ${response.status}`);
    }
    const result = await response.json();
    return Array.isArray(result) ? result : [];
    } catch (error) {
    console.error("Failed to load doctors::", error);
    return  [];
    }	
  } 

/*
  Function: deleteDoctor
  Purpose: Delete a specific doctor using their ID and an authentication token

   Use fetch() with the DELETE method
    - The URL includes the doctor ID and token as path parameters
   Convert the response to JSON
   Return an object with:
    - success: true if deletion was successful
    - message: message from the server
   If an error occurs, log it and return a default failure response
*/


export async function deleteDoctor() {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}/${token}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    if (response.ok) {
    const result = await response.json();
      return {
        success: true, message: result.message || `Deletion successful (Status: ${response.status})`
	 };
    } catch (error) {
    		console.error("Error :: ", error)
   	     return { success: false, message: error.message }
    } 
}


/*
  Function: saveDoctor
  Purpose: Save (create) a new doctor using a POST request

   Use fetch() with the POST method
    - URL includes the token in the path
    - Set headers to specify JSON content type
    - Convert the doctor object to JSON in the request body

   Parse the JSON response and return:
    - success: whether the request succeeded
    - message: from the server

   Catch and log errors
    - Return a failure response if an error occurs
*/

export async function saveDoctors() {
  try {
    const response = await fetch(`${DOCTOR_API}/${token}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    if (!response.ok) {
      throw new Error(`Error with status: ${response.status}`);
    }
    const result = await response.json();
    return Array.isArray(result) ? result : [];
    } catch (error) {
    console.error("Failed to save doctors::", error);
    return  [];
    }	
  } 






  Function: filterDoctors
  Purpose: Fetch doctors based on filtering criteria (name, time, and specialty)

   Use fetch() with the GET method
    - Include the name, time, and specialty as URL path parameters
   Check if the response is OK
    - If yes, parse and return the doctor data
    - If no, log the error and return an object with an empty 'doctors' array

   Catch any other errors, alert the user, and return a default empty result
*/


export async function filterDoctors() {
  try {
    const response = await fetch(`${DOCTOR_API}/${name}//${time}//${speciality}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    if (!response.ok) {
      throw new Error(`Error with status: ${response.status}`);
    }
    const result = await response.json();
    return Array.isArray(result) ? result : [];
    } catch (error) {
    console.error("Failed to filter doctors::", error);
    return  [];
    }	
  } 




