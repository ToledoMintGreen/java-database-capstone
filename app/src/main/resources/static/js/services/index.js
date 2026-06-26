// index.js (Pfad: src/main/resources/static/js/services/index.js)

/* Import the openModal function to handle showing login popups/modals */
/*   Import the base API URL from the config file */
import { openModal } from '../components/modals.js';
import { API_BASE_URL } from '../config/config.js';

/*   Define constants for the admin and doctor login API endpoints using the base URL  */
/*  CORS correction added login */
const ADMIN_API = API_BASE_URL + "/admin/login";
const DOCTOR_API = API_BASE_URL + "/doctor/login";

/*   Event listener   */
/*     Use the window.onload event to ensure DOM elements are available after page load */   
window.onload = function () {
    const adminBtn = document.getElementById('adminLogin');
    if (adminBtn) { 
        adminBtn.addEventListener('click', () => {
            openModal('adminLogin'); 
        });
    }

    const doctorBtn = document.getElementById('doctorLogin');
    if (doctorBtn) { 
        doctorBtn.addEventListener('click', () => {
            openModal('doctorLogin'); 
        });
    }

    const patientBtn = document.getElementById('patientLogin');
    if (patientBtn) {
       patientBtn.addEventListener('click', () => {
            // KORREKTUR: Kein Modal mehr! Leitet direkt an deine Dashboard-URL weiter
            window.location.href = "/pages/patientDashboard.html";
       });
    }
};

/*  Define a function named adminLoginHandler on the global window object */
window.loginAdmin = async function adminLoginHandler() {
    try {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const admin = { username, password }; 

        const response = await fetch(ADMIN_API, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(admin)
        });

        if (response.ok) {
            const result = await response.json();
            if (result.token) {
                if (typeof selectRole === 'function') selectRole('admin');
                localStorage.setItem('token', result.token);
                window.location.href = `/adminDashboard/${result.token}`;
            } else {
                alert('❌ No token received!');
            }
        } else {
            alert('❌ Invalid credentials!');
        }
    } catch (error) {
        alert("❌ Failed to Login : " + error.message);
    }
};

/*  Implement Doctor Login Handler */
window.loginDoctor = async function doctorLoginHandler() {
    try {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const doctor = { username, password }; 

        const response = await fetch(DOCTOR_API, { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(doctor) 
        });

        if (response.ok) {
            const result = await response.json();
            if (result.token) {
                if (typeof selectRole === 'function') selectRole('doctor');
                localStorage.setItem('token', result.token);
                window.location.href = `/doctorDashboard/${result.token}`;
            } else {
                alert('❌ No token received!');
            }
        } else {
            alert('❌ Invalid credentials!');
        }
    } catch (error) {
        alert("❌ Failed to Login : " + error.message);
    }
};
