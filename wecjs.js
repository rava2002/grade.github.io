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
    1: {
        "MA201 Mathematics I": 4,
        "PH201 Physics": 4,
        "CY201 Chemistry": 4,
        "HS201 English for Communication": 3,
        "ME201 Workshop and Manufacturing Practice": 1.5,
        "PH202 Physics Laboratory": 1.5,
        "CY202 Chemistry Laboratory": 1.5
    },
    2: {
        "MA202 Mathematics II": 4,
        "EE201 Basic Electrical Engineering": 4,
        "CS201 Programming for Problem Solving": 3,
        "ME202 Engineering Graphics and Computer Aided Drawing": 3,
        "CE201 Environmental Science": 0,
        "EE202 Basic Electrical Engineering Laboratory": 1.5,
        "CS202 Programming Laboratory": 1.5
    },
    3: {
        "SH201 Biology for Engineers": 2,
        "EC235 Electronic Devices and Digital Systems": 3,
        "CS203 Computer Organization and Architecture": 4,
        "CS204 Data Structures": 3,
        "CS205 Object Oriented Programming Languages": 3,
        "EC236 Electronic Devices and Digital Systems Laboratory": 1.5,
        "CS206 Data Structures Laboratory": 1.5,
        "CS207 Object Oriented Programming Languages Laboratory": 1.5,
        "SH202 Indian Constitution": 0
    },
    4: {
        "MA206 Mathematics for Computing": 4,
        "CS208 Operating Systems": 3,
        "CS209 Design and Analysis of Algorithms": 3,
        "CS210 Database Management Systems": 3,
        "CS211 Software Engineering": 4,
        "CS212 Operating System Laboratory": 1.5,
        "CS213 Design and Analysis of Algorithms Laboratory": 1.5,
        "CS214 Database Management Systems Laboratory": 1.5
    },
    5: {
        "HS202 Industrial Economics and Management": 3,
        "CS215 Platform Technologies": 3,
        "CS216 Computer Networks": 3,
        "CS217 Automata Theory and Compiler Design": 4,
        "CSYXX Professional Elective Course - I": 3,
        "CS218 Platform Technologies Laboratory": 1.5,
        "CS219 Computer Networks Laboratory": 1.5,
        "SH203 Essence of Indian Traditional Knowledge": 0
    },
    6: {
        "EP201 Entrepreneurship": 2,
        "CS220 Microprocessors and Microcontrollers": 3,
        "CS221 Web Technologies": 3,
        "CS222 Information Security": 4,
        "CSYXX Professional Elective Course - II": 3,
        "CSYXX Professional Elective Course - III": 3,
        "CS223 Microprocessors and Microcontrollers Laboratory": 1.5,
        "CS224 Web Technologies Laboratory": 1.5
    },
    7: {
        "CS225 Artificial Intelligence": 3,
        "CS226 Parallel and Distributed Systems": 4,
        "CS227 Data Science Essentials": 4,
        "CSYXX Professional Elective Course - IV": 3,
        "CSYXX Professional Elective Course - V": 3,
        "CS228 Artificial Intelligence Laboratory": 1.5,
        "CS229 Seminar": 1,
        "CS230 Professional Ethics": 0
    },
    8: {
        "SWOXX Open Elective through SWAYAM": 2,
        "SWOXX Open Elective through SWAYAM": 2,
        "CS231 Comprehensive Test": 1,
        "CS232 Internship": 2,
        "CS233 Project Work": 8
    }
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
