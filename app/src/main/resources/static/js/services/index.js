// index.js




/* Import the openModal function to handle showing login popups/modals */
/*   Import the base API URL from the config file */

import { openModal } from '../components/modals.js.'
import { API_BASE_URL } from '../config/config.js'


/*   Define constants for the admin and doctor login API endpoints using the base URL  */


const ADMIN_API = API_BASE_URL + "/admin"

const DOCTOR_API = API_BASE_URL + "/doctor"

/*   Event listener   */
/*     Use the window.onload event to ensure DOM elements are available after page load /*   
/*     Inside this function: /*   
/*      - Select the "adminLogin" and "doctorLogin" buttons using getElementById /*   
/*      - If the admin login button exists: /*   
/*          - Add a click event listener that calls openModal('adminLogin') to show the admin login modal /*   
/*      - If the doctor login button exists: /*   
/*           - Add a click event listener that calls openModal('doctorLogin') to show the doctor login modal /*   

	window.onload = function () {
		const adminBtn = document.getElementById('adminLogin');
	if (adminBtn) { adminBtn.addEventListener('click', () => {
		openModal('adminLogin'); });
		const doctorBtn = document.getElementById('doctorLogin');
	if (doctorBtn) { adminBtn.addEventListener('click', () => {
		openModal('doctorLogin'); });
	}


/*  Define a function named adminLoginHandler on the global window object
    This function will be triggered when the admin submits their login credentials

  	Step 1: Get the entered username and password from the input fields
  	Step 2: Create an admin object with these credentials
  	Step 3: Use fetch() to send a POST request to the ADMIN_API endpoint
    	- Set method to POST
    	- Add headers with 'Content-Type: application/json'
    	- Convert the admin object to JSON and send in the body
  	Step 4: If the response is successful:
    	- Parse the JSON response to get the token
    	- Store the token in localStorage
    	- Call selectRole('admin') to proceed with admin-specific behavior
	Step 5: If login fails or credentials are invalid:
    	- Show an alert with an error message
  	Step 6: Wrap everything in a try-catch to handle network or server errors
    	- Show a generic error message if something goes wrong
*/

window.loginAdmin = async function adminLoginHandler() {
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const admin = { username, password }; 
    
    console.log("loginAdmin :: ", admin);

    const response = await fetch(API_BASE_URL, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(admin)
    });

    if (response.ok) {
      const result = await response.json();
      
      if (result.token) {
        if (typeof selectRole === 'function') selectRole('admin');
        localStorage.setItem('token', result.token);
        window.location.href = '/pages/adminDashboard.html';
      } else {
        alert('❌ No token received!');
      }
    } else {
      // Dieser Block gehört zum "if (response.ok)"
      alert('❌ Invalid credentials!');
    }
  } catch (error) {
    alert("❌ Failed to Login : " + error.message);
    console.log("Error :: loginAdmin :: ", error);
  }
};



 /*  Implement Doctor Login Handler */
 /*  Define a function named doctorLoginHandler on the global window object
  This function will be triggered when a doctor submits their login credentials

  Step 1: Get the entered email and password from the input fields
  Step 2: Create a doctor object with these credentials

  Step 3: Use fetch() to send a POST request to the DOCTOR_API endpoint
    - Include headers and request body similar to admin login

  Step 4: If login is successful:
    - Parse the JSON response to get the token
    - Store the token in localStorage
    - Call selectRole('doctor') to proceed with doctor-specific behavior

  Step 5: If login fails:
    - Show an alert for invalid credentials

  Step 6: Wrap in a try-catch block to handle errors gracefully
    - Log the error to the console
    - Show a generic error message
*/

window.loginDoctor = async function doctorLoginHandler() {
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const doctor = { username, password }; 
    
    console.log("loginAdmin :: ", doctor);

    const response = await fetch(API_BASE_URL, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(admin)
    });

    if (response.ok) {
      const result = await response.json();
      
      if (result.token) {
        if (typeof selectRole === 'function') selectRole('doctor');
        localStorage.setItem('token', result.token);
        window.location.href = '/pages/doctorDashboard.html';
      } else {
        alert('❌ No token received!');
      }
    } else {
      // Dieser Block gehört zum "if (response.ok)"
      alert('❌ Invalid credentials!');
    }
  } catch (error) {
    alert("❌ Failed to Login : " + error.message);
    console.log("Error :: loginAdmin :: ", error);
  }
};


