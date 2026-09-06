const API_URL = "/students";

const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTableBody");

let editingId = null;


// ===============================
// NOTIFICATION
// ===============================

function showNotification(message, type) {

    const notification = document.getElementById("notification");

    notification.textContent = message;

    notification.className = "notification " + type;

    setTimeout(function() {

        notification.className = "notification";

    }, 3000);
}
function clearErrors() {

    document.querySelectorAll(".form-group small")
        .forEach(error => {
            error.textContent = "";
        });

    document.querySelectorAll(".form-group input")
        .forEach(input => {
            input.classList.remove("input-error");
            input.classList.remove("input-success");
        });
}


function showError(inputId, errorId, message) {

    document.getElementById(inputId)
        .classList.add("input-error");

    document.getElementById(errorId)
        .textContent = message;
}

// ===============================
// FORM SUBMIT - ADD / UPDATE
// ===============================

form.addEventListener("submit", function(event) {

    event.preventDefault();
	clearErrors();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const course = document.getElementById("course").value.trim();
    const department = document.getElementById("department").value.trim();
    const marks = Number(document.getElementById("marks").value);


    // ===============================
    // VALIDATION
    // ===============================

	// Name validation
	if (!/^[A-Za-z ]+$/.test(name)) {

	    showError(
	        "name",
	        "nameError",
	        "Name should contain only letters."
	    );

	    return;
	}


	// Email validation
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

	    showError(
	        "email",
	        "emailError",
	        "Please enter a valid email address."
	    );

	    return;
	}


	// Phone validation
	if (!/^[0-9]{10}$/.test(phone)) {

	    showError(
	        "phone",
	        "phoneError",
	        "Phone number must contain exactly 10 digits."
	    );

	    return;
	}


	// Course validation
	if (course === "") {

	    showError(
	        "course",
	        "courseError",
	        "Please enter the course."
	    );

	    return;
	}


	// Department validation
	if (department === "") {

	    showError(
	        "department",
	        "departmentError",
	        "Please enter the department."
	    );

	    return;
	}


	// Marks validation
	if (
	    document.getElementById("marks").value === "" ||
	    marks < 0 ||
	    marks > 100
	) {

	    showError(
	        "marks",
	        "marksError",
	        "Marks must be between 0 and 100."
	    );

	    return;
	}
    // Student object
    const student = {

        name: name,
        email: email,
        phone: phone,
        course: course,
        department: department,
        marks: marks

    };


    // ===============================
    // UPDATE STUDENT
    // ===============================

    if (editingId !== null) {

        fetch(`${API_URL}/${editingId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        })

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to update student");
            }

            return response.json();

        })

		.then(data => {

		    showNotification(
		        "Student added successfully!",
		        "success"
		    );

		    form.reset();

		    loadStudents();

		})
		.catch(error => {

		    console.error("Error:", error);

		    showNotification(
		        "Failed to add student",
		        "error"
		    );

		});

        return;
    }


    // ===============================
    // ADD STUDENT
    // ===============================

    fetch(API_URL, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(student)

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to add student");
        }

        return response.json();

    })

    .then(data => {

        alert("Student added successfully!");

        form.reset();

        loadStudents();

    })

    .catch(error => {

        console.error("Error:", error);

        alert("Failed to add student");

    });

});


// ===============================
// GET ALL STUDENTS
// ===============================

function loadStudents() {

    fetch(API_URL)

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load students");
            }

            return response.json();

        })

        .then(students => {

            tableBody.innerHTML = "";

            // Update dashboard
            updateDashboard(students);


            // If no students
            if (students.length === 0) {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td colspan="8">
                        No students found
                    </td>
                `;

                tableBody.appendChild(row);

                return;
            }


            // Display students
            students.forEach(student => {

                const row = document.createElement("tr");


                row.innerHTML = `

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.email}</td>

                    <td>${student.phone}</td>

                    <td>${student.course}</td>

                    <td>${student.department}</td>

                    <td>${student.marks}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editStudent(${student.id})">

                            Edit

                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteStudent(${student.id})">

                            Delete

                        </button>

                    </td>

                `;


                tableBody.appendChild(row);

            });

        })

        .catch(error => {

            console.error("Error:", error);

        });

}


// ===============================
// EDIT STUDENT
// ===============================

function editStudent(id) {

    fetch(`${API_URL}/${id}`)

        .then(response => {

            if (!response.ok) {
                throw new Error("Student not found");
            }

            return response.json();

        })

        .then(student => {


            // Put student data into form

            document.getElementById("name").value =
                student.name;

            document.getElementById("email").value =
                student.email;

            document.getElementById("phone").value =
                student.phone;

            document.getElementById("course").value =
                student.course;

            document.getElementById("department").value =
                student.department;

            document.getElementById("marks").value =
                student.marks;


            // Store ID
            editingId = id;


            // Change button text

            document.querySelector(".add-btn").textContent =
                "Update Student";


            // Scroll to form

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        })

        .catch(error => {

            console.error("Error:", error);

            alert("Student not found");

        });

}


// ===============================
// DELETE STUDENT
// ===============================

function deleteStudent(id) {


    if (!confirm(
        "Are you sure you want to delete this student?"
    )) {

        return;

    }


    fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to delete student");
        }

        return response.text();

    })

    .then(data => {

        alert(data);

        loadStudents();

    })

    .catch(error => {

        console.error("Error:", error);

        alert("Failed to delete student");

    });

}


// ===============================
// SEARCH STUDENT BY ID
// ===============================

function searchStudent() {

    const id =
        document.getElementById("searchId").value.trim();


    // Check empty ID

    if (id === "") {

        alert("Please enter a student ID");

        return;

    }


    fetch(`${API_URL}/${id}`)

        .then(response => {

            if (!response.ok) {

                throw new Error("Student not found");

            }

            return response.json();

        })

        .then(student => {


            tableBody.innerHTML = "";


            const row = document.createElement("tr");


            row.innerHTML = `

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.phone}</td>

                <td>${student.course}</td>

                <td>${student.department}</td>

                <td>${student.marks}</td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editStudent(${student.id})">

                        Edit

                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${student.id})">

                        Delete

                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        })

        .catch(error => {

            alert("Student not found");

            console.error(error);

        });

}


// ===============================
// DASHBOARD
// ===============================

function updateDashboard(students) {


    // Total students

    const total = students.length;


    document.getElementById("totalStudents").textContent =
        total;


    // No students

    if (total === 0) {

        document.getElementById("averageMarks").textContent =
            "0";

        document.getElementById("highestMarks").textContent =
            "0";

        return;

    }


    // Calculate total marks

    let totalMarks = 0;


    // First student's marks

    let highest = Number(students[0].marks);


    students.forEach(student => {


        const marks = Number(student.marks);


        totalMarks += marks;


        // Find highest marks

        if (marks > highest) {

            highest = marks;

        }

    });


    // Calculate average

    const average = totalMarks / total;


    document.getElementById("averageMarks").textContent =
        average.toFixed(2);


    document.getElementById("highestMarks").textContent =
        highest;

}


// ===============================
// LOAD STUDENTS WHEN PAGE OPENS
// ===============================

loadStudents();