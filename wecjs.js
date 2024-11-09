function generateGradeInputs() {
    const numSemesters = document.getElementById("num-semesters").value;
    const gradeForm = document.getElementById("grade-form");
    const gradesSection = document.getElementById("grades-section");
    const resultsSection = document.getElementById("results");

    if (numSemesters < 1 || numSemesters > 8) {
        alert("Please enter a valid number of semesters (1-8).");
        return;
    }

    // Clear previous inputs
    gradeForm.innerHTML = "";
    gradesSection.style.display = "block";
    resultsSection.style.display = "none";

    // Generate inputs for each semester
    for (let semester = 1; semester <= numSemesters; semester++) {
        const semesterDiv = document.createElement("div");
        semesterDiv.innerHTML = `<h3>Semester ${semester}</h3>`;
        
        const numSubjects = prompt(`Enter number of subjects for Semester ${semester}:`);
        
        for (let i = 1; i <= numSubjects; i++) {
            semesterDiv.innerHTML += `
                <label>Subject ${i} Name:</label>
                <input type="text" id="subject-${semester}-${i}-name" placeholder="Enter subject name">
                
                <label>Credits for Subject ${i}:</label>
                <input type="number" id="subject-${semester}-${i}-credits" placeholder="Enter subject credits">
                
                <label>Grade for Subject ${i}:</label>
                <input type="text" id="subject-${semester}-${i}-grade" placeholder="Enter grade (A, B, C, etc.)">
            `;
        }

        gradeForm.appendChild(semesterDiv);
    }
}

function calculateSGPAAndCGPA() {
    const studentName = document.getElementById("student-name").value;
    const numSemesters = document.getElementById("num-semesters").value;
    const gradeForm = document.getElementById("grade-form");
    const resultsSection = document.getElementById("results");

    let totalCredits = 0;
    let weightedGradePointsSum = 0;
    let totalSemesterCredits = 0;
    let totalSemesterGradePoints = 0;
    let subjectsData = "";

    const gradePointsMapping = {
        "S": 10,
        "A": 9,
        "B": 8,
        "C": 7,
        "D": 6,
        "E": 5,
        "F": 0
    };

    // Loop through each semester
    for (let semester = 1; semester <= numSemesters; semester++) {
        let semesterCredits = 0;
        let semesterGradePointsSum = 0;
        let semesterSubjects = "";
        
        const numSubjects = gradeForm.querySelectorAll(`#subject-${semester}-name`).length;

        // Loop through each subject in the semester
        for (let i = 1; i <= numSubjects; i++) {
            const subjectName = document.getElementById(`subject-${semester}-${i}-name`).value;
            const subjectCredits = parseInt(document.getElementById(`subject-${semester}-${i}-credits`).value);
            const subjectGrade = document.getElementById(`subject-${semester}-${i}-grade`).value.toUpperCase();
            
            const gradePoint = gradePointsMapping[subjectGrade] || 0;
            semesterCredits += subjectCredits;
            semesterGradePointsSum += subjectCredits * gradePoint;
            
            subjectsData += `<p>Subject: ${subjectName}, Credits: ${subjectCredits}, Grade: ${subjectGrade}, Grade Points: ${gradePoint}</p>`;
        }
        
        totalCredits += semesterCredits;
        weightedGradePointsSum += semesterGradePointsSum;
        totalSemesterCredits += semesterCredits;
        totalSemesterGradePoints += semesterGradePointsSum;
    }

    const sgpa = (weightedGradePointsSum / totalCredits).toFixed(2);
    const cgpa = (totalSemesterGradePoints / totalSemesterCredits).toFixed(2);

    // Display student name and subjects info
    document.getElementById("student-display").innerHTML = `Student Name: ${studentName}`;
    document.getElementById("subjects-display").innerHTML = subjectsData;
    document.getElementById("sgpa-display").innerHTML = `SGPA: ${sgpa}`;
    document.getElementById("cgpa-display").innerHTML = `CGPA: ${cgpa}`;

    // Show the results section
    resultsSection.style.display = "block";
}
