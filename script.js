
const notes = ['A', 'A# / Bb', 'B', 'C', 'C# / Db', 'D', 'D# / Eb', 'E', 'F', 'F# / Gb', 'G', 'G# / Ab'];


const openStrings = ['E', 'B', 'G', 'D', 'A', 'E'];

const fretboard = [];

for (let string = 0; string < 6; string++) {
    fretboard[string] = [];
    let noteIndex = notes.indexOf(openStrings[string]);
    for (let fret = 0; fret <= 12; fret++) {
        fretboard[string][fret] = notes[noteIndex % 12];
        noteIndex++;
    }
}


function generateRandomPosition() {
    const stringNumber = Math.floor(Math.random() * 6); 
    const fretNumber = Math.floor(Math.random() * 13);  
    return { stringNumber, fretNumber };
}

const questionWindow = document.getElementById('question-window');
const answerWindow = document.getElementById('answer-window');
const startQuestionBtn = document.getElementById('start-question-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');
const showAnswerBtn = document.getElementById('show-answer-btn');


let currentPosition = null;


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayQuestion() {
    const stringNumber = currentPosition.stringNumber + 1; 
    const questionText = `
        <div style="display: flex; align-items: center;">
            <strong> Which note is on </strong>
            <div style="font-weight: bolder;color: #FFD700; margin-left: 5px; margin-right: 5px;">String ${stringNumber}</div>
            <strong> and </strong>
            <div style="
            font-weight: bolder; color:  #43b0e2 ; margin-left: 5px; margin-right: 5px;">Fret ${currentPosition.fretNumber}</div>
        </div>`;
    questionWindow.innerHTML = capitalizeFirstLetter(questionText);
    answerWindow.textContent = '';  
    showAnswerBtn.disabled = false; 
}
startQuestionBtn.addEventListener('click', () => {
    currentPosition = generateRandomPosition();
    displayQuestion();
    startQuestionBtn.disabled = true; 
    nextQuestionBtn.disabled = false; 
});

nextQuestionBtn.addEventListener('click', () => {
    currentPosition = generateRandomPosition();
    displayQuestion();
});


showAnswerBtn.addEventListener('click', () => {
    const note = fretboard[currentPosition.stringNumber][currentPosition.fretNumber];
    answerWindow.innerHTML = `<strong style="font-weight: bold; font-size: 50px;">${note}</strong>`;
    showAnswerBtn.disabled = true; 
});

nextQuestionBtn.disabled = true;
showAnswerBtn.disabled = true;
