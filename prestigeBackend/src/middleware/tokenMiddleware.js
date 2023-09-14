import jwt from 'jsonwebtoken';

export const jwtMiddleware = (req, res, next) => {
    // extract the jwt token if any
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader) {
        if (!authorizationHeader.match(/^Bearer /)) {
            res.sendStatus(401);
            return;
        }
        const jwtToken = authorizationHeader.slice(7);
        // validate the jwt token
        let decodedJwtToken;
        try {
            decodedJwtToken = jwt.verify(jwtToken, process.env.SECRET_KEY);
        } catch (err) {
            res.sendStatus(401);
            return;
        }
        // put token data in req
        req.authenticatedUser = decodedJwtToken;
    }
    next();
}