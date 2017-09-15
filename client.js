const net = require('net');
const fs = require('fs');
const port = 8124;

const client = new net.Socket();
client.setEncoding('utf8');

const Incoming = {
    'ACK': () => {
        console.log('Connected');
    },

    'DEC': () => {
        client.destroy();
    },
};

client.connect(port, () => {});

client.on('data', (data) => {
    if(data in Incoming){
        Incoming[data].call();
    }
    else{
        console.log('Unknown command');
    }
});

client.on('close', () => {
    console.log('Connection closed');
});
