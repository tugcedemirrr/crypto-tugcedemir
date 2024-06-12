// import functions to create and delete challenges out of challenge.js
const {createChallenge, deleteChallenge} = require("./challenge.js");
// import the decrypt function out of decrypt.js
const decrypt = require("./decrypt.js");
// import the findprefix function out of hash.js
const findPrefix = require("./hash.js");

// create decrypt Challenge
createChallenge("decrypt")
.then(body => 
    // call the decrypt function with key, nonce and ciphertext received from the API
    decrypt(body.key, body.nonce, body.ciphertext)
.then(payload => 
    // delete challenge if decryption is successfull
    deleteChallenge(payload, body.challengeId, "decrypt")
));

// create hash challenge
createChallenge("hash")
.then(body => 
    // call findPrefix function with the message received from the API
    findPrefix(body.message)
.then(payload => 
    // delete challenge if prefix is found
    deleteChallenge(payload, body.challengeId, "hash")
));