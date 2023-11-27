const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');
const { comparePassword } = require('../utils/passwordUtil');
const { getStudentByAdmissionNumberAndPassword } = require('./studentController');

const generateAccessToken = (user) => {
    return jwt.sign(user, jwtSecretKey, { expiresIn: '15m' });
};

const login = async (req, res) => {
    try {
        const { admissionNumber, password } = req.body;
        const student = getStudentByAdmissionNumberAndPassword(admissionNumber, password);
        if (student && await comparePassword(password, student.password)) {
            const accessToken = generateAccessToken({ admissionNumber: student.admissionNumber });
            res.status(200).json({
                accessToken,
                message: 'Login successful',
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { login };
