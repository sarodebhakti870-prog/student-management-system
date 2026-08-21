const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const emptyMessage = document.getElementById("emptyMessage");

const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const editIndex = document.getElementById("editIndex");

// Get saved students from LocalStorage
let students = JSON.parse(localStorage.getItem("students")) || [];


// READ - Display students
function displayStudents() {

    table.innerHTML = "";

    if (students.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    students.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>

            <td>
                <button class="edit"
                    onclick="editStudent(${index})">
                    Edit
                </button>

                <button class="delete"
                    onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}


// CREATE / UPDATE
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const student = {

        rollNo: document.getElementById("rollNo").value,
        name: document.getElementById("name").value,
        course: document.getElementById("course").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value

    };


    // CREATE
    if (editIndex.value === "") {

        students.push(student);

    }

    // UPDATE
    else {

        students[Number(editIndex.value)] = student;

    }


    // Save data
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    form.reset();

    editIndex.value = "";

    submitBtn.textContent = "Add Student";

    cancelBtn.hidden = true;

    displayStudents();

});


// Edit Student
function editStudent(index) {

    const student = students[index];

    document.getElementById("rollNo").value =
        student.rollNo;

    document.getElementById("name").value =
        student.name;

    document.getElementById("course").value =
        student.course;

    document.getElementById("email").value =
        student.email;

    document.getElementById("phone").value =
        student.phone;


    editIndex.value = index;

    submitBtn.textContent = "Update Student";

    cancelBtn.hidden = false;
}


// DELETE
function deleteStudent(index) {

    if (confirm("Are you sure you want to delete this student?")) {

        students.splice(index, 1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();

    }
}


// Cancel Update
cancelBtn.addEventListener("click", function() {

    form.reset();

    editIndex.value = "";

    submitBtn.textContent = "Add Student";

    cancelBtn.hidden = true;

});


// Display existing records
displayStudents();