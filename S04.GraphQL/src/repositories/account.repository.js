import crypto from 'crypto';
import httpErrors from 'http-errors';
import random from 'random';
import jwt from 'jsonwebtoken';
import qrcode from 'qrcode';

import Accounts from '../models/account.model.js';

class AccountRepository {

    retrieveById(id) {
        return Accounts.findById(id).populate('tweets');
    }

    async login(email, password) {
        const account = await Accounts.findOne({email:email});

        if(!account){
            // Email non existant
            return { err: httpErrors.Unauthorized()};
        } else {
            if (this.validatePassword(password, account)){
                return { account };
            } else {
                // Mauvais mot de passe
                return {err: httpErrors.Unauthorized()};
            }
        }
    }

    validatePassword(password, account) {
        const iteration = parseInt(process.env.HASH_ITERATION, 10);
        const hash = crypto.pbkdf2Sync(password, account.salt, iteration, 64, 'sha512').toString('base64');
        return account.hash === hash;
    }

    create(account) {

        account.fourDigits = random.int(1000, 9999);
        account.salt = crypto.randomBytes(16).toString('base64');
        const iteration = parseInt(process.env.HASH_ITERATION, 10);

        const startTime = process.hrtime();

        account.hash = crypto.pbkdf2Sync(account.password, account.salt, iteration, 64, 'sha512').toString('base64');   // Ajout d'un salt généré au hasard et hashé un nombre "iteration" de fois

        const endTime = process.hrtime(startTime);
        console.info('Execution time (iteration - %d): %ds %dms', iteration, endTime[0], endTime[1] / 1000000);

        delete account.password;

        return Accounts.create(account);
    }

    generateJWT(email) {
       const accessToken = jwt.sign({email}, process.env.JWT_TOKEN_SECRET, {expiresIn:process.env.JWT_TOKEN_LIFE});
       const refreshToken = jwt.sign({email}, process.env.JWT_REFRESH_SECRET, {expiresIn:process.env.JWT_REFRESH_LIFE});

        qrcode.toFile(`${email}.png`,accessToken);  //Créer le code QR to token

       return { accessToken, refreshToken };
    }

    async validateRefreshToken(email, refreshToken) {
      
        
    }

    logout(email) {
       
    }

    logoutRefresh(refreshToken) {
        
    }

    transform(account) {
        delete account._id;
        delete account.__v;
        delete account.password;
        return account;
    }
}

export default new AccountRepository();