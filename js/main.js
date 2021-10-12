console.log('hello')
// variables
let choices = document.querySelectorAll('.choice')
const player1Scorboard = document.querySelector('#player1Scoreboard')
const player2Scorboard = document.querySelector('#player2Scoreboard')
// const gamestatus = document.querySelector('h2')


// functions
let choiceArray = [
    'rock',
    'paper',
    'scissors',
    'lizard',
    'spock'
]


// function handleClick(event){
//     const compChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)]
//     console.log(compChoice)
//     console.log(event.target.id)
// }
// a class of options for bot to randomize through
// method that randomizes bots choice
// conditional statements that compare bots and users choice
// player object
// bot object
// that keep track of score


// event listeners
// for buttons from players choice
// for (let i=0; i<choices.length; i++){
//     choices[i].addEventListener('click', handleClick)
// }


class Game {
    constructor() {
        this.player = new Player()
        this.computer = new Computer()
        this.player1Score = 0
        this.player2Score = 0
        this.handleClick = this.handleClick.bind(this)

        for (let i = 0; i < choices.length; i++) {
            choices[i].addEventListener('click', this.handleClick)
        }
    }
    handleClick(event) {
        let playerChoice = this.player.getChoice(event)
        let url = `/api?playerChoice=${playerChoice}`
        console.log(url)
        fetch(url).then(response => response.json()).then((data) => {
            console.log('Got response from api', data);
            let compChoice = document.querySelector('h2').innerHTML='the computer chose '+ data.computerChoice //put this on the html
            let winner = document.querySelector('h1').innerHTML=data.winner

            console.log('playerchoice', playerChoice)
            console.log('compchoice', compChoice)
        });
        console.log('line after fetch')
    }
    updateScoreboard() {
        player1Scorboard.innerHTML = this.player1Score
        player2Scorboard.innerHTML = this.player2Score
    }
}

class Player {
    getChoice(event) {
        return event.target.id
    }
}
class Computer {
    getChoice() {
    }
}

const game = new Game()
