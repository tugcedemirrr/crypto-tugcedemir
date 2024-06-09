const _sodium = require('libsodium-wrappers')

async function decrypt(key, nonce, cipherText){
    await _sodium.ready;
    //decode from b64 since the API's repsonse carries b64 encoded data. (Raw binary data cannot be transported trough HTTP).
    const decodedKey = _sodium.from_base64(key, _sodium.base64_variants.ORIGINAL);
    const decodedNonce = _sodium.from_base64(nonce, _sodium.base64_variants.ORIGINAL);
    const decodedCipherText = _sodium.from_base64(cipherText, _sodium.base64_variants.ORIGINAL);

    try{
        // try opening secretbox, the nonce and key are used to decrypt and authenticate the ciphertext. If correct we get the decrypted message.
        const plainText = _sodium.crypto_secretbox_open_easy(decodedCipherText, decodedNonce, decodedKey); 
        //create payload
        const payload = {
            //Encode the plaintext to b64 to transport through HTTP.
            plaintext : _sodium.to_base64(plainText, _sodium.base64_variants.ORIGINAL)
        };

        return payload
    } catch(err){
        console.error('cannot open secretbox: ' + err.message)
    }
    
}

module.exports = decrypt;