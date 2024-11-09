const gradePoints = {
    "S": 10,
    "A": 9,
    "B": 8,
    "C": 7,
    "D": 6,
    "E": 5,
    "F": 0
};

const semesterData = {
    // Predefined subject and credits data
    1: {
        "MA201 Mathematics I": 4,
        "PH201 Physics": 4,
        "CY201 Chemistry": 4,
        "HS201 English for Communication": 3,
        "ME201 Workshop and Manufacturing Practice": 1.5,
        "PH202 Physics Laboratory": 1.5,
        "CY202 Chemistry Laboratory": 1.5
    },
    // Add other semesters here...
};

function generateGradeInputs() {
    const numSemesters = document.getElementById("num-semesters").value;
    const gradesSection = document.getElementById("grades-section");
    const gradeForm = document.getElementById("grade-form");

    if (numSemesters <= 0) {
        alert("Please enter a valid number of semesters.");
        return;
    }

    gradeForm.innerHTML = "";
    gradesSection.style.display = "block";

    for (let semester = 1; semester <= numSemesters; semester++) {
        if (!semesterData[semester]) continue;

        const semesterHeader = document.createElement('h3');
        semesterHeader.textContent = `Semester ${semester}`;
        gradeForm.appendChild(semesterHeader);

        const subjects = semesterData[semester];
        for (const [subject, credit] of Object.entries(subjects)) {
            const gradeInputGroup = document.createElement('div');
            gradeInputGroup.classList.add('grade-inputs');
            gradeInputGroup.innerHTML = `
                <label for="grade-${semester}-${subject}">${subject} (${credit} Credits):</label>
                <input type="text" id="grade-${semester}-${subject}" placeholder="Enter Grade (S, A, B, C, D, E, F)">
            `;
            gradeForm.appendChild(gradeInputGroup);
        }
    }

    const submitButton = document.createElement('button');
    submitButton.textContent = "Calculate SGPA & CGPA";
    submitButton.onclick = calculateSGPAAndCGPA;
    gradeForm.appendChild(submitButton);
}

function calculateSGPAAndCGPA() {
    const studentName = document.getElementById("student-name").value;
    const numSemesters = document.getElementById("num-semesters").value;

    let totalCredits = 0;
    let weightedGradePointsSum = 0;
    let totalSemesterCredits = 0;
    let totalSemesterGradePoints = 0;

    for (let semester = 1; semester <= numSemesters; semester++) {
        if (!semesterData[semester]) continue;

        let semesterGradePointsSum = 0;
        let semesterCredits = 0;

        const subjects = semesterData[semester];
        for (const [subject, credit] of Object.entries(subjects)) {
            const grade = document.getElementById(`grade-${semester}-${subject}`).value.toUpperCase();
            const gradePoint = gradePoints[grade] || 0;

            semesterCredits += credit;
            semesterGradePointsSum += (gradePoint * credit);
        }

        totalCredits += semesterCredits;
        weightedGradePointsSum += semesterGradePointsSum;
        totalSemesterCredits += semesterCredits;
        totalSemesterGradePoints += semesterGradePointsSum;
    }

    const sgpa = (weightedGradePointsSum / totalCredits).toFixed(2);
    const cgpa = (totalSemesterGradePoints / totalSemesterCredits).toFixed(2);

    document.getElementById("sgpa-display").innerHTML = `SGPA: ${sgpa}`;
    document.getElementById("cgpa-display").innerHTML = `CGPA: ${cgpa}`;
    document.getElementById("results").style.display = "block";
}
