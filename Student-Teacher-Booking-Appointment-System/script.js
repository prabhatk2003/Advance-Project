// Firebase authentication and firestore
const auth = firebase.auth();
const db = firebase.firestore();

// Login
const tab = document.getElementById('loginForm');
    tab.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Login successful');
            // tab.classList.remove("active")
        })
        .catch((error) => {
            alert('Login failed: ' + error.message);
        });
});

// Book Appointment
document.getElementById('appointmentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const studentName = document.getElementById('studentName').value;
    const teacherName = document.getElementById('teacherName').value;
    const appointmentTime = document.getElementById('appointmentTime').value;
    
    db.collection('appointments').add({
        studentName,
        teacherName,
        appointmentTime,
        status: 'Pending'
    })
    .then(() => {
        alert('Appointment booked successfully');
        document.getElementById('appointmentForm').reset();
        loadAppointments();
    })
    .catch((error) => {
        alert('Error booking appointment: ' + error.message);
    });
});

// Load Appointments
function loadAppointments() {
    const appointmentList = document.getElementById('appointmentList');
    appointmentList.innerHTML = '';
    
    db.collection('appointments').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const appointment = doc.data();
            appointmentList.innerHTML += `<div>
                <h3>${appointment.studentName} - ${appointment.teacherName}</h3>
                <p>Time: ${new Date(appointment.appointmentTime).toLocaleString()}</p>
                <p>Status: ${appointment.status}</p>
            </div>`;
        });
    });
}

loadAppointments();
