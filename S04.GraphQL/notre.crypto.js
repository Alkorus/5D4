import crypto from 'crypto';

const block = {
    id:1,
    transaction: [],
    miner: 'François Massé',
    nonce:1
}
let tries = 0;
let hash = '';
do {
    hash = crypto.createHash('sha256').update(JSON.stringify(block)).digest('hex');
    //console.log(hash);
    block.nonce++;
    tries++;
} while(!hash.startsWith('000000'));
console.log(hash);
console.log(tries);

