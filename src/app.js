const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const session = require('express-session');

const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes'); 
const {exposeCsrfToken} = require('./middleware/csrfMiddleware')
const { sessionSecretKey } = require('./config');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    secret: sessionSecretKey,  
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));
app.use(exposeCsrfToken);
 

app.use('/api/students', studentRoutes);
app.use('/auth', authRoutes);  

module.exports = app;
