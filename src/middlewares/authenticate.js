import jwt  from 'jsonwebtoken';
import config from '../config/server.js'

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json(
            {
                error: 'Access denied. No token provided.'
            });
    }

    jwt.verify(token,config.JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;