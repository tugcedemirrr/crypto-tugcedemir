// import libsodium library for cryptographic functions
const _sodium = require('libsodium-wrappers');

// async function to find prefix that solves the hash challenge 
async function findPrefix(challengeMessage) {
    // waiting for libsodium to be loaded
    await _sodium.ready;
    // decode the encoded base64 challenge message
    const challengeMessageDecoded = _sodium.from_base64(challengeMessage, _sodium.base64_variants.ORIGINAL);
    
    let prefix;
    let combinedMessage;
    let hash;
    let attempts = 0;
    //find prefix that makes the first 2 bytes of the hash 0
    do {
        // generate a random prefix of 3 bytes
        prefix = _sodium.randombytes_buf(3);
        // combine the prefix with decoded challenge message
        combinedMessage = new Uint8Array([...prefix, ...challengeMessageDecoded]);
        // calculate the hash of the combined message
        hash = _sodium.crypto_generichash(_sodium.crypto_generichash_BYTES, combinedMessage);
        attempts++;
    } while (hash[0] !== 0 || hash[1] !== 0); // repeat till the first 2 bytes of the hash are 0

    // log the amount of attempts in the found prefix, encoded to base64
    console.log('HASH CHALLENGE - FOUND! Number of attempts: ' + attempts);
    //Create payload
    const payload = {
        prefix : _sodium.to_base64(prefix, _sodium.base64_variants.ORIGINAL)
    }

    return payload


}

// export the findPrefix function
module.exports = findPrefix;