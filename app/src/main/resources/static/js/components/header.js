// header.js

/* Define the `renderHeader` Function */
/* The `renderHeader` function is responsible for rendering the entire header based on the user's session, role, and whether they are logged in. */

function renderHeader() {

    /* Select the Header Div */
    /* The `headerDiv` variable retrieves the HTML element with the ID `header`, where the header content will be inserted. */
  
    const headerDiv = document.getElementById("header");
  
  
    /* Check if the Current Page is the Root Page */
    /* The `window.location.pathname` is checked to see if the current page is the root (`/`). */
    /* If true, the user's session data (role) is removed from `localStorage`, and the header is rendered without any user-specific elements (just the logo and site title). */
  
  
    if (window.location.pathname.endsWith("/")) {
      localStorage.removeItem("userRole");
      localStorage.removeItem("token");
      headerDiv.innerHTML = `
             <header class="header">
               <div class="logo-section">
                 <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
                 <span class="logo-title">Hospital CMS</span>
               </div>
             </header>`;
      return;
    }
  
  
  
    /* Retrieve the User's Role and Token from LocalStorage */
    /* The `role` (user role like admin, patient, doctor) and `token` (authentication token) are retrieved from `localStorage` to determine the user's current session. */
  
  
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
  
  
    /* Initialize Header Content */
    /* The `headerContent` variable is initialized with basic header HTML (logo section), to which additional elements will be added based on the user's role. */
  
    let headerContent = `<header class="header">
           <div class="logo-section">
             <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
             <span class="logo-title">Hospital CMS</span>
           </div>
           <nav>`;
  
  
    /* Handle Session Expiry or Invalid Login */
  
    /* If a user with a role like `loggedPatient`, `admin`, or `doctor` does not have a valid `token`, the session is considered expired or invalid. */
    /* The user is logged out, and a message is shown. */
  
  
    if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
      localStorage.removeItem("userRole");
      alert("Session expired or invalid login. Please log in again.");
      window.location.href = "/";
      return;
    }
  
  
    /* Add Role-Specific Header Content */
    /* Depending on the user's role, different actions or buttons are rendered in the header:  */
    /* **Admin**: Can add a doctor and log out.  */
    /* **Doctor**: Has a home button and log out.  */
    /* **Patient**: Shows login and signup buttons.  */
    /* **loggedPatient**: Add Home, Appointments, and Logout */
  
    else if (role === "admin") {
      headerContent += `
             <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
             <a href="#" onclick="logout()">Logout</a>`;
    } else if (role === "doctor") {
      headerContent += `
             <button class="doctorBtn"  onclick="selectRole('doctor')">Home</button>
             <a href="#" onclick="logout()">Logout</a>`;
    } else if (role === "patient") {
      headerContent += `
             <button id="patientLogin" class="loginBtn">Login</button>
             <button id="patientSignup" class="signupBtn">Sign Up</button>`;
    } else if (role === "loggedPatient") {
      headerContent += `
             <button id="home" class="homeBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
             <button id="patientAppointments" class="appointmentsBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
             <a href="#" onclick="logoutPatient()">Logout</a>`;
    }
  
    /*  Close the Header Section  */
    headerContent += `</nav></header>`;
  
  
    /* Render the Header Content */
    headerDiv.innerHTML = headerContent;
  
  
    /* Attach Event Listeners to Header Buttons */
    /* Call `attachHeaderButtonListeners` to add event listeners to any dynamically created buttons in the header (e.g., login, logout, home). */
  
    attachHeaderButtonListeners();
  
  }
  
  /* Helper Functions */
  /* **attachHeaderButtonListeners**: Adds event listeners to login buttons for "Doctor" and "Admin" roles. */
  /* If clicked, it opens the respective login modal. */
  
  function attachHeaderButtonListeners() {
    document.getElementById("adminLoginBtn")?.addEventListener("click", () => openModal('adminLogin'));
    document.getElementById("doctorLoginBtn")?.addEventListener("click", () => openModal('doctorLogin'));
  }
  
  /* **logout**: Removes user session data and redirects the user to the root page. */
  /* **logoutPatient**: Removes the patient's session token and redirects to the patient dashboard. */
  
  
  /* Implementing Logout Functionality for clearing the session and going back to the start */
  /* Remove both token and userRole from localStorage. */
  /* Redirect to homepage using window.location.href = "/". */
  /* For patient we can retain their “role” as just patient, not loggedPatient, to show login/signup again. */
  
  
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  }
  
  
  function logoutPatient() {
    localStorage.removeItem("token");
    localStorage.setItem("userRole", "patient");
    window.location.href = "/pages/patientDashboard.html"; // oder gewünschte Zielseite
  }
  