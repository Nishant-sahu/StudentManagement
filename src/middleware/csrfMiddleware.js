
const exposeCsrfToken = (req, res, next) => {
    let token;
    if (!req.session.csrfToken) {
        token = Math.random().toString(36).substring(2, 15);
        req.session.csrfToken = token
        res.cookie('_csrf', token, { httpOnly: true });
        console.log('CSRF Token generated:', token);
    }
    next();
};

const csrfProtection = (req, res, next) => {
    const clientToken = req.body.csrfToken || req.headers['x-csrf-token'];
    console.log('Client Token generated:', clientToken);
    console.log('Session Token generated:', req.session.csrfToken);
    if (!clientToken || clientToken !== req.session.csrfToken) {
        return res.status(403).json({ error: 'Invalid CSRF token' });
    }
    next();
};

module.exports = { csrfProtection, exposeCsrfToken };
