const _sodium = require('libsodium-wrappers');

async function findPrefix(challengeMessage) {
    await _sodium.ready;

    const challengeMessageDecoded = _sodium.from_base64(challengeMessage, _sodium.base64_variants.ORIGINAL);
    
    let prefix;
    let combinedMessage;
    let hash;
    let attempts = 0;
    //find prefix that makes the first 2 bytes 0
    do {
        prefix = _sodium.randombytes_buf(3);
        combinedMessage = new Uint8Array([...prefix, ...challengeMessageDecoded]);
        hash = _sodium.crypto_generichash(_sodium.crypto_generichash_BYTES, combinedMessage);
        attempts++;
    } while (hash[0] !== 0 || hash[1] !== 0);

    console.log('HASH CHALLENGE - FOUND! Number of attempts: ' + attempts);
    //Create payload
    const payload = {
        prefix : _sodium.to_base64(prefix, _sodium.base64_variants.ORIGINAL)
    }

    return payload


}

module.exports = findPrefix;