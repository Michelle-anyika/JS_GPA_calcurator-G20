#!/usr/bin/node
document.addEventListener("DOMContentLoaded", function () {
  const coursesBody = document.getElementById("coursesBody");
  const addCourseBtn = document.getElementById("addCourseBtn");
  const calculateBtn = document.getElementById("calculateBtn");
  const addSemesterBtn = document.getElementById("addSemesterBtn");
  const resultDiv = document.getElementById("result");

  let courses = JSON.parse(localStorage.getItem("gpaCourses")) || [];

  // Render existing courses
  renderCourses();

  // Add course button click handler
  addCourseBtn.addEventListener("click", function () {
    addNewCourseRow();
  });

  // Calculate button click handler
  calculateBtn.addEventListener("click", function () {
    calculateGPA();
  });

  // Add semester button click handler
  addSemesterBtn.addEventListener("click", function () {
    alert(
      "Semester added! This would create a new semester  section in a more complete implementation."
    );
  });

  // Keyboard event listener for 'S' key
  document.addEventListener("keydown", function (e) {
    if (e.key === "s" || e.key === "S") {
      console.log("Current courses data:", courses);
    }
  });
  function addNewCourseRow(course = { name: "", grade: 5 }) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" class="course-name" value="${
          course.name
        }" placeholder="Eg. Advanced Calculus"></td>
            <td>
            <select class="course-grade">
                    <option value="5" ${
                      course.grade == 5 ? "selected" : ""
                    }>5 (Excellent)</option>
                    <option value="4" ${
                      course.grade == 4 ? "selected" : ""
                    }>4 (Very Good)</option>
                    <option value="3" ${
                      course.grade == 3 ? "selected" : ""
                    }>3 (Good)</option>
                    <option value="2" ${
                      course.grade == 2 ? "selected" : ""
                    }>2 (Satisfactory)</option>
                    <option value="1" ${
                      course.grade == 1 ? "selected" : ""
                    }>1 (Pass)</option>
                </select>
            </td>
            <td><button class="remove-btn">Remove</button></td>
        `;

    row.querySelector(".remove-btn").addEventListener("click", function () {
      row.remove();
      saveCourses();
    });

    // Add event listeners to save changes
    const inputs = row.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("change", saveCourses);
    });

    coursesBody.appendChild(row);
  }

  function renderCourses() {
    coursesBody.innerHTML = "";

    if (courses.length === 0) {
      // Add one empty row by default
      addNewCourseRow();
    } else {
      courses.forEach((course) => {
        addNewCourseRow(course);
      });
    }
  }

  function saveCourses() {
    const rows = coursesBody.querySelectorAll("tr");
    courses = [];

    rows.forEach((row) => {
      const name = row.querySelector(".course-name").value;
      const grade = parseInt(row.querySelector(".course-grade").value);

      courses.push({
        name,
        grade,
      });
    });

    localStorage.setItem("gpaCourses", JSON.stringify(courses));
  }

  function calculateGPA() {
    saveCourses();

    if (courses.length === 0) {
      resultDiv.textContent = "Please add at least one course.";
      return;
    }

    let totalGradePoints = 0;

    courses.forEach((course) => {
      totalGradePoints += course.grade;
    });

    const gpa = totalGradePoints / courses.length;

    resultDiv.textContent = `Your GPA is: ${gpa.toFixed(2)}`;
  }
});
