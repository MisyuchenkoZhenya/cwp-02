const child_process = require('child_process');

const count = getCountFromArgv();

function getCountFromArgv(){
    const number = +process.argv[2];
    return isNaN(+process.argv[2]) ? 0 : number;
}

for(let i = 0; i < count; i++){
    const spawn = child_process.spawnSync('node', ['./client.js', i]);
}
