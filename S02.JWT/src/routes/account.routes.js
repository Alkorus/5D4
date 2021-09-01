import dayjs from 'dayjs';
import express from 'express';
import httpErrors from 'http-errors';

import accountRepository from '../repositories/account.repository.js';

const router = express.Router();

class AccountRoutes {
    constructor() {
        router.post('/', this.post);
        router.post('/login', this.login);
        router.post('/refresh', this.refreshToken);
        router.get('/secure', this.secure);
        router.delete('/logout', this.logout);
    }

    async post(req, res, next) {
       
    }

    secure(req, res, next) {
       
    }

    async login(req, res, next) {
       
    }

    async refreshToken(req, res, next) {
        
    }

    async logout(req, res, next) {
     
    }
}

new AccountRoutes();
export default router;