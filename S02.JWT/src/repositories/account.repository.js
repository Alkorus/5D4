import crypto from 'crypto';
import httpErrors from 'http-errors';

import Accounts from '../models/account.model.js';

class AccountRepository {

    async login(email, password) {
      
    }

    validatePassword(password, account) {
        
    }

    create(account) {
      
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
        
    }
}

export default new AccountRepository();