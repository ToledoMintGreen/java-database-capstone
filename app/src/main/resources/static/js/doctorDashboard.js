// doctorDashboard.js



/*
  Import getAllAppointments to fetch appointments from the backend
  Import createPatientRow to generate a table row for each patient appointment


  Get the table body where patient rows will be added
  Initialize selectedDate with today's date in 'YYYY-MM-DD' format
  Get the saved token from localStorage (used for authenticated API calls)
  Initialize patientName to null (used for filtering by name)
*/


import { getAllAppointments } from '../services/appointmentRecordService.js';
import { createPatientRow } from '../components/patientRows.js';

const datePicker = document.getElementById("date-picker");
const todayButton = document.getElementById("today-btn");
const searchBar = document.getElementById("searchBar");
const tableBody = document.getElementById("appointmentTableBody");

const getTodayDate = () => new Date().toISOString().split('T')[0];


searchBar?.addEventListener("input", handleFilterChange);
	

if (todayButton) {
    todayButton.addEventListener('click', () => {
        const today = getTodayDate();
        if (datePicker) datePicker.value = today;
        handleFilterChange(); // Nutzt die zentrale Ladefunktion
    });
}

if (datePicker) {
    datePicker.addEventListener('change', () => {
        handleFilterChange();
    });
}

async function handleFilterChange() {
    const patientName = searchBar?.value.trim() || null;
    const selectedDate = datePicker?.value || null;

    try {
        const appointments = await getAppointments(selectedDate, patientName, token);
        renderAppointmentsTable(appointments);
    } catch (error) {
        console.error("Failed to load appointments:", error);
        alert("❌ Error loading appointments. Try again later.");
    }
}



function renderAppointmentsTable(appointments) {
    if (!tableBody) return;
    tableBody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No Appointments found for today.</td></tr>`;
        return;
    }

    appointments.forEach(appointment => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${appointment.patientId}</td>
            <td>${appointment.patientName}</td>
            <td>${appointment.patientPhone}</td>
            <td>${appointment.patientEmail}</td>
            <td>
                ${appointment.status == 0 
                    ? `<img src="../assets/images/edit/edit.png" alt="Edit" class="edit-btn" style="cursor:pointer" data-id="${appointment.patientId}">` 
                    : "-"}
            </td>
        `;

        // Event Listener
        const editImg = tr.querySelector(".edit-btn");
        if (editImg) {
            editImg.addEventListener("click", () => {
            });
        }

        tableBody.appendChild(tr);
    });
}



window.addEventListener('DOMContentLoaded', () => {
    const today = getTodayDate();
    if (datePicker) datePicker.value = today;
    handleFilterChange();
});



/*
  Add an 'input' event listener to the search bar
  On each keystroke:
    - Trim and check the input value
    - If not empty, use it as the patientName for filtering
    - Else, reset patientName to "null" (as expected by backend)
    - Reload the appointments list with the updated filter


  Add a click listener to the "Today" button
  When clicked:
    - Set selectedDate to today's date
    - Update the date picker UI to match
    - Reload the appointments for today


  Add a change event listener to the date picker
  When the date changes:
    - Update selectedDate with the new value
    - Reload the appointments for that specific date
*/

/*
  Function: loadAppointments
  Purpose: Fetch and display appointments based on selected date and optional patient name

  Step 1: Call getAllAppointments with selectedDate, patientName, and token
  Step 2: Clear the table body content before rendering new rows

  Step 3: If no appointments are returned:
    - Display a message row: "No Appointments found for today."

  Step 4: If appointments exist:
    - Loop through each appointment and construct a 'patient' object with id, name, phone, and email
    - Call createPatientRow to generate a table row for the appointment
    - Append each row to the table body

  Step 5: Catch and handle any errors during fetch:
    - Show a message row: "Error loading appointments. Try again later."


  When the page is fully loaded (DOMContentLoaded):
    - Call renderContent() (assumes it sets up the UI layout)
    - Call loadAppointments() to display today's appointments by default
*/

