'use strict';

const questionsDB = [
    {
        question: 'What does “www” stand for in a website browser?',
        opt1: 'World wide web',
        opt2: 'Web wide world',
        opt3: 'Web network connection',
        opt4: 'World wide network',
        correct: 'World wide web',
        id: 1,
    },
    {
        question: 'Which one of these characters is not friends with Harry Potter?',
        opt1: 'Ron Weasley',
        opt2: 'Neville Longbottom',
        opt3: 'Draco Malfoy',
        opt4: 'Hermione Granger',
        correct: 'Draco Malfoy',
        id: 2,
    },
    {
        question: 'Which planet is the hottest?',
        opt1: 'Venus',
        opt2: 'Saturn',
        opt3: 'Mercury',
        opt4: 'Mars',
        correct: 'Mercury',
        id: 3,
    },
    {
        question: 'Fe is the chemical symbol for…',
        opt1: 'Zinc',
        opt2: 'Hydrogen',
        opt3: 'Fluorine',
        opt4: 'Iron',
        correct: 'Iron',
        id: 4,
    },
    {
        question: 'Which country gifted the Statue of Liberty to the U.S.?',
        opt1: 'Germany',
        opt2: 'China',
        opt3: 'France',
        opt4: 'Italy',
        correct: 'France',
        id: 5,        
    },
    {
        question: 'Which rapper was known for his album Blue Slide Park?',
        opt1: 'J Cole',
        opt2: 'Post Malone',
        opt3: 'Eminem',
        opt4: 'Mac Miller',
        correct: 'Mac Miller',
        id: 6,
    },
    {
        question: 'What is the most populous city in Canada?',
        opt1: 'Toronto',
        opt2: 'Ontario',
        opt3: 'Quebec',
        opt4: 'Vancouver',
        correct: 'Toronto',
        id: 7, 
    },
    {
        question: 'How often does the moon orbit the Earth?',
        opt1: 'every 7 days',
        opt2: 'every 27 days',
        opt3: 'every 30 days',
        opt4: 'every 365 days',
        correct: 'every 27 days',
        id: 8,
    },
    {
        question: 'Which poet wrote the poem “The Raven”?',
        opt1: 'Robert Frost',
        opt2: 'Edgar Allan Poe',
        opt3: 'Walt Whitman',
        opt4: 'Sylvia Plath',
        correct: 'Edgar Allan Poe',
        id: 9,
    },
    {
        question: 'In The Office, what was the food that Dwight grew on his farm?',
        opt1: 'pumpkins',
        opt2: 'beets',
        opt3: 'onions',
        opt4: 'potatoes',
        correct: 'beets',
        id: 10,
    }

];

let questionCount = 1;

const mainContainer = document.querySelector('.container');
const questionNum  = document.querySelector('.question-num');
const questionParr =  document.querySelector('.question');
const answersDiv = document.querySelector('.answers');

const startBtn = document.querySelector('.btn-start');
const submitBtn = document.querySelector('.submit-btn');

let currentQuestion;


class UI {
    static displayQuestion () {
        return questionParr.textContent = currentQuestion.question;
    }

    static displayOptions () {
        const options = Object.entries(currentQuestion).filter(item => item[0].startsWith('opt'));
        
        [...answersDiv.children].forEach((div, i) => {
            div.children[0].textContent = options[i][1];
        });
    }

    static showSelectedOption () {
        answersDiv.addEventListener('click', function (e) {
            UI.clearOptions();

            const selected = e.target.closest('.option');
            selected?.classList.toggle('selected');
        });
    }

    static clearOptions () {
        [...answersDiv.children].forEach(function (div) {
            if (div.classList.contains('selected')) {
                div.classList.remove('selected');
            }
        });
    }
}

class Game {
    static findQuestionInDB () {
        currentQuestion = questionsDB.find(obj => obj.id === questionCount);
    }

    static compareOption () {
        const catchSelected = [...answersDiv.children]
            .find(div => div.classList.contains('selected'))
            .children[0].textContent;

        if (catchSelected === currentQuestion.correct) {
            questionCount++;
            Game.findQuestionInDB();
            UI.displayQuestion();
            UI.displayOptions();
            UI.clearOptions();
        } else {
            alert('Game Over');
        }
    }
}

startBtn.addEventListener('click', function () {
    Game.findQuestionInDB();
    UI.displayQuestion();
    UI.displayOptions();
});

submitBtn.addEventListener('click', function () {
    Game.compareOption();
});

UI.showSelectedOption();