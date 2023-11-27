const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, jwtSecretKey, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = user;
        next();
    });
};

module.exports = { authenticateJWT };
