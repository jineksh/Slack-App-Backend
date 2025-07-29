import jwt  from 'jsonwebtoken';

import config from '../config/server.js'

const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, config.JWT_KEY, { expiresIn: '30d' });
    return token;
}

export default  generateToken;