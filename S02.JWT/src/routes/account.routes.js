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
       try {
            // TODO: Il faudrait valider les informations avant de l'ajouter dans la BD (express-validator)
            let account = await accountRepository.create(req.body);
            account = account.toObject({getters:false, vitrtuals:false});
            account = accountRepository.transform(account);
            res.status(201).json(account);
       } catch (err) {
           return next(httpErrors.InternalServerError(err));
       }
    }

    secure(req, res, next) {
       
    }

    async login(req, res, next) {
        const {username, password} = req.body;
        
        const result = await accountRepository.login(username, password);

        if (result.account) {
            res.status(200).end();
        } else {
            return next(result.err);
        }
    }

    async refreshToken(req, res, next) {
        
    }

    async logout(req, res, next) {
     
    }
}

new AccountRoutes();
export default router;