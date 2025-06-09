#!/usr/bin/node
document.addEventListener('DOMContentLoaded', function() {
    const coursesBody = document.getElementById('coursesBody');
    const addCourseBtn = document.getElementById('addCourseBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    const addSemesterBtn = document.getElementById('addSemesterBtn');
    const resultDiv = document.getElementById('result');
    
    
    let courses = JSON.parse(localStorage.getItem('gpaCourses')) || [];
    
    // Render existing courses
    renderCourses();
    
    // Add course button click handler
    addCourseBtn.addEventListener('click', function() {
        addNewCourseRow();
    });
    
    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        calculateGPA();
    });
    
    // Add semester button click handler
    addSemesterBtn.addEventListener('click', function() {
        alert('Semester added! This would create a new semester section in a more complete implementation.');
    });
    
    // Keyboard event listener for 'S' key
    document.addEventListener('keydown', function(e) {
        if (e.key === 's' || e.key === 'S') {
            console.log('Current courses data:', courses);
        }
    });
