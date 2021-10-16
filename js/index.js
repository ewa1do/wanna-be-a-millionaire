'use strict';

const questionsDB = [
    {
        question: 'What does “www” stand for in a website browser?',
        opt1: 'World wide web',
        opt2: 'Web wide world',
        opt3: 'Web network connection',
        opt4: 'World wide network',
        correct: 'World wide web',
        id: 0,
    },
    {
        question: 'Which one of these characters is not friends with Harry Potter?',
        opt1: 'Ron Weasley',
        opt2: 'Neville Longbottom',
        opt3: 'Draco Malfoy',
        opt4: 'Hermione Granger',
        correct: 'Draco Malfoy',
        id: 1,
    },
    {
        question: 'Which planet is the hottest?',
        opt1: 'Venus',
        opt2: 'Saturn',
        opt3: 'Mercury',
        opt4: 'Mars',
        correct: 'Mercury',
        id: 2,
    },
    {
        question: 'Fe is the chemical symbol for…',
        opt1: 'Zinc',
        opt2: 'Hydrogen',
        opt3: 'Fluorine',
        opt4: 'Iron',
        correct: 'Iron',
        id: 3,
    },
    {
        question: 'Which country gifted the Statue of Liberty to the U.S.?',
        opt1: 'Germany',
        opt2: 'China',
        opt3: 'France',
        opt4: 'Italy',
        correct: 'France',
        id: 4,        
    },
    {
        question: 'Which rapper was known for his album Blue Slide Park?',
        opt1: 'J Cole',
        opt2: 'Post Malone',
        opt3: 'Eminem',
        opt4: 'Mac Miller',
        correct: 'Mac Miller',
        id: 5,
    },
    {
        question: 'What is the most populous city in Canada?',
        opt1: 'Toronto',
        opt2: 'Ontario',
        opt3: 'Quebec',
        opt4: 'Vancouver',
        correct: 'Toronto',
        id: 6, 
    },
    {
        question: 'How often does the moon orbit the Earth?',
        opt1: 'every 7 days',
        opt2: 'every 27 days',
        opt3: 'every 30 days',
        opt4: 'every 365 days',
        correct: 'every 27 days',
        id: 7,
    },
    {
        question: 'Which poet wrote the poem “The Raven”?',
        opt1: 'Robert Frost',
        opt2: 'Edgar Allan Poe',
        opt3: 'Walt Whitman',
        opt4: 'Sylvia Plath',
        correct: 'Edgar Allan Poe',
        id: 8,
    },
    {
        question: 'In The Office, what was the food that Dwight grew on his farm?',
        opt1: 'pumpkins',
        opt2: 'beets',
        opt3: 'onions',
        opt4: 'potatoes',
        correct: 'beets',
        id: 9,
    },
    {
        question: 'This is a  test question',
        opt1: 'option 1',
        opt2: 'option 2',
        opt3: 'option 3',
        opt4: 'option 4',
        correct: 'option 1',
        id: 10,  
    }

];

let questionCount = 0;

const mainContainer = document.querySelector('.container');
const questionNum  = document.querySelector('.question-num');
const questionParr =  document.querySelector('.question');
const answersDiv = document.querySelector('.answers');
const modalDiv = document.querySelector('.modal');
const modalGameOver = document.querySelector('.modal-over')

const startBtn = document.querySelector('.btn-start');
const submitBtn = document.querySelector('.submit-btn');
const restartBtn = document.querySelector('.restart');
const exitBtn = document.querySelector('.btn-exit');

let currentQuestion;

class UI {
    static displayQuestion () {
            questionParr.textContent = currentQuestion.question;
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

    static displayWinModal () {
        modalDiv.classList.remove('hide');
    }

    static displayGameOver () {
        modalGameOver.classList.remove('hide');
    }

    static removeModal () {
        modalDiv.classList.add('hide');
    }

    static removeGameOverModal () {
        modalGameOver.classList.add('hide');
    }

    static updateQuestionNumber () {
        return questionNum.textContent += questionCount;
    }

    static createExitBtn () {
        const infoDiv = document.createElement('div');
        const p = document.createElement('p');
        const btnContainer = document.createElement('div');
        const yes = document.createElement('button');
        const no = document.createElement('button');

        p.textContent = 'Are you sure you want to exit?';
        yes.textContent = 'Yes';
        no.textContent = 'No';

        btnContainer.appendChild(yes);
        btnContainer.appendChild(no);

        infoDiv.appendChild(p);
        infoDiv.appendChild(btnContainer);

        infoDiv.classList.add('exit');
        yes.classList.add('yes');
        no.classList.add('no');

        document.querySelector('body').appendChild(infoDiv);

        UI.removeExitButton();
    }

    static removeExitButton () {
        document.querySelector('.exit').addEventListener('click', function (e) {
            e.preventDefault();

            if (e.target.classList.contains('yes')) {
                questionCount = 0;
                Game.start();
                document.querySelector('.exit').remove();
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
            Game.start();
            UI.clearOptions();
        } else {
            UI.displayGameOver();
        } 
        
        if (questionCount === questionsDB.length -1) {
            UI.displayWinModal();
        }
    }

    static start () {
        Game.findQuestionInDB();
        UI.displayQuestion();
        UI.displayOptions();
        UI.clearOptions();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    Game.start();
});

startBtn.addEventListener('click', function (e) {
    e.preventDefault();
    Game.start();
});

submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    Game.compareOption();
});

document.querySelector('.hide-divs').addEventListener('click', function (e) {
    e.preventDefault();
    
    if (e.target.classList.contains('restart')) {
        questionCount = 0;
        Game.start();
        UI.removeModal();
        UI.removeGameOverModal();
    }
});

exitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    UI.createExitBtn();
});

UI.showSelectedOption();