// import libsodium library for cryptographic functions
const _sodium = require('libsodium-wrappers')

// async function to decrypt a ciphertext
async function decrypt(key, nonce, cipherText){
    // wait for libsodium to be loaded
    await _sodium.ready;
    // decode base64-coded key, nonce and ciphertext
    const decodedKey = _sodium.from_base64(key, _sodium.base64_variants.ORIGINAL);
    const decodedNonce = _sodium.from_base64(nonce, _sodium.base64_variants.ORIGINAL);
    const decodedCipherText = _sodium.from_base64(cipherText, _sodium.base64_variants.ORIGINAL);

    try{
        // try opening secretbox with given nonce and key 
        const plainText = _sodium.crypto_secretbox_open_easy(decodedCipherText, decodedNonce, decodedKey); 
        // create payload with decrypted plaintext, encoded to base 64 through HTTP
        const payload = {
            plaintext : _sodium.to_base64(plainText, _sodium.base64_variants.ORIGINAL)
        };
        return payload
    } catch(err){
        console.error('cannot open secretbox: ' + err.message)
    }
    
}
// export the decrypt function
module.exports = decrypt;