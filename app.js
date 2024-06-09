const {createChallenge, deleteChallenge} = require("./challenge.js");
const decrypt = require("./decrypt.js");
const findPrefix = require("./hash.js");

//Create decrypt Challenge
createChallenge("decrypt")
.then(body => decrypt(body.key, body.nonce, body.ciphertext)
.then(payload => deleteChallenge(payload, body.challengeId, "decrypt")
));

//Create hash challenge
createChallenge("hash")
.then(body => findPrefix(body.message)
.then(payload => deleteChallenge(payload, body.challengeId, "hash")
));