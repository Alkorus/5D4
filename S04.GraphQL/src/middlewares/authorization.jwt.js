import expressJWT from 'express-jwt';

const revokedRefreshTokens = [];

const guardAuthorizationJWT = expressJWT({
    secret: process.env.JWT_TOKEN_SECRET,
    algorithms: ['HS256']
});

const guardRefreshJWT = expressJWT({
    secret: process.env.JWT_REFRESH_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'refreshToken',
    getToken: (req) => {
        //revokedRefreshTokens.push(req.body.refreshToken);
        return req.body.refreshToken;
    },
    isRevoked: (req, payload, done) => {
        const providedToken = req.body.refreshToken;
        const exists = revokedRefreshTokens.find(t => t === providedToken);
        done(null, exists);
    }
})

export default {
    guardAuthorizationJWT, 
    guardRefreshJWT,
    revokedRefreshTokens
}