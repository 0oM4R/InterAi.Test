const crypto = require('crypto');


/**
 * Generate hashed password
 * @param password : String 
 * @returns :String hashed as string
 */

const genPassword = (password) => {

    const genHash = crypto.pbkdf2Sync(password, '', 10000, 64, 'sha512').toString('hex');
    return genHash;
}



/**
 * Compares entered password with old one
 * @param  password : String new password
 * @param  hash : String old password
 * @returns : Boolean - True if `password` after hashing equals existed one
 */
const validPassword = (password, hash, salt = '') => {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;