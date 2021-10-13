const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');
const {create} = require('domain');

let choiceArray = [
    'rock',
    'paper',
    'scissors',
    'lizard',
    'spock'
]
function whoWon(playerChoice, computerChoice) {
    console.log(`got${playerChoice} and ${computerChoice} but logic is not written yet`)
    // write winning conditionals for the palyer
    if ((playerChoice == "scissors" && computerChoice == "paper") || (playerChoice == "scissors" && computerChoice == "lizard") || (playerChoice == "paper" && computerChoice == "rock") || (playerChoice == "paper" && computerChoice == "spock") || (playerChoice == "rock" && computerChoice == "scissors") || (playerChoice == "rock" && computerChoice == "lizard") || (playerChoice == "lizard" && computerChoice == "paper") || (playerChoice == "lizard" && computerChoice == "spock") || (playerChoice == "spock" && computerChoice == "rock") || (playerChoice == "spock" && computerChoice == "scissors")) {
        return 'You Win!'
    } else if (playerChoice == computerChoice) {
        return 'Its a tie!'
    } else {
        return 'You Lose!'
    }

}
const server = http.createServer(function (req, res) {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    console.log(params)
    if (page == '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    } else if (page == '/css/style.css') {
        fs.readFile('css/style.css', function (err, data) {
            res.write(data);
            res.end();
        });
    } else if (page == '/js/main.js') {
        fs.readFile('js/main.js', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });
    } else if (page == '/api') {
        if ('playerChoice' in params) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            const computerChoice = choiceArray[Math.floor(Math.random() * choiceArray.length)]
            const playerChoice = params['playerChoice']
            const objToJson = {

                computerChoice: computerChoice,
                winner: whoWon(playerChoice, computerChoice)
            }
            res.end(JSON.stringify(objToJson));
        } else {
            console.log('warning did not get a player choice')
        }
    } else {
        figlet('404!!', function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            res.write(data);
            res.end();
        });
    }
});

server.listen(8000);
