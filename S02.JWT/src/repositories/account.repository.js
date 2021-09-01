import crypto from 'crypto';
import httpErrors from 'http-errors';

import Accounts from '../models/account.model.js';

class AccountRepository {

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
        return account.password === password;
    }

    create(account) {

        account.salt = crypto.randomBytes(16).toString('base64');
        const iteration = parseInt(process.env.HASH_ITERATION, 10);

        const startTime = process.hrtime();

        account.hash = crypto.pbkdf2Sync(account.password, account.salt, iteration, 64, 'sha512').toString('base64');

        const endTime = process.hrtime(startTime);
        console.info('Execution time (iteration - %d): %ds %dms', iteration, endTime[0], endTime[1] / 1000000);

        delete account.password;

        return Accounts.create(account);
    }

    generateJWT(account, needNewRefresh = true) {
       
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