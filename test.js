const fs = require('fs');

const sh = require('./shuffle_alg');

let qa = readJson();

function readJson(){
    let data = JSON.parse(fs.readFileSync('qa.json'));
    return data['QA'];
}


console.log(qa[0].a);