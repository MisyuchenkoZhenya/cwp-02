const net = require('net');
const fs = require('fs');
const path = require('path');
const logOut = require('./helpers/path_creater')
const sh = require('./helpers/server_helper')
const port = 8124;

let qa = readJson();
let increment = 0;
let pathToLog = '';

const Incoming = {
    'QA': (client, pathToLog) => {
        LOG(pathToLog, `Client with id ${client.id} connected`);
        client.write('ACK');
    },
    'DEC': (client, pathToLog) => {
        client.write('DEC');
    },
};

const server = net.createServer((client) => {
    client.id = ++increment;
    client.setEncoding('utf8');
    pathToLog = logOut.getLogPath(client, fs.realpathSync(''));   
    fs.writeFileSync(pathToLog, '');

    client.on('data', (data) => {
        if(data in Incoming){
            Incoming[data](client, pathToLog);
        }
        else if(sh.findQuestion(data, qa)){
            sendAnswer(client, data, qa);
        }
        else{
            console.log('Unknown command');
            client.write('DEC');
        }
    });

    client.on('end', () => {
        LOG(pathToLog, `Client disconnected`)
    });
});

server.listen({host: 'localhost', port: port, exclusive: true},  () => {
    console.log(`Server listening on localhost:${port}`);
});

function LOG(pathToLog, message) {
    date = new Date();
    fs.appendFileSync(pathToLog, date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() +
                        ' - ' + message + '\n', (err) => {
        if(error){
            console.error(err.toString());
        }
    });
}

function readJson(){
    let data = JSON.parse(fs.readFileSync('qa.json'));
    return data['QA'];
}

function sendAnswer(client, question, qa){
    let answer = '';

    const rand = Math.floor(Math.random() * (qa.length));
    answer = rand % 2 === 0 ? sh.getAnswer(question, qa) : qa[rand].a;
    
    LOG(pathToLog, `Qestion: ${question}` + '\n\t\t' + `Answer: ${answer}`);
    client.write(answer);
}
