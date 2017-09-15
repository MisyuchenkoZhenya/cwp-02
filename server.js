const net = require('net');
const fs = require('fs');
const port = 8124;

let increment = 0;
let qa = JSON.parse(fs.readFileSync('qa.json').toString());

const Incoming = {
    'QA': () => {

    }
};

const server = net.createServer((client) => {
    client.id = ++increment;
    client.setEncoding('utf8');

    console.log(`Client with id ${client.id} connected`);

    client.on('data', (data) => {
        if(data in Incoming){
            Incoming[data].call();
        }
        else{
            console.log('Unknown command');
        }
    });

    client.on('end', () => {
        console.log('Client disconnected')
    });
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});
