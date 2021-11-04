const router = require('express').Router();
const connection = require('../../config/DB.config');
const userModel = require('../schema/users.schema');


/**
 * ------- authentication controller ---------
 */
const authenticate = require('../controllers/authUser');
const index = require('../controllers/index');
const isAuth = require('./authMiddleware').isAuth;
const isAdmin = require('./authMiddleware').isAdmin;

/**
 * -------------- POST ROUTES ----------------
 */

router.post('/login', authenticate.postLogin);

router.post('/register', authenticate.postRegister, (req, res, next) => {
    res.redirect('/login');
});


/**
 * -------------- GET ROUTES ----------------
 */
//Fake home page
router.get('/', index.home);

// Fake Login Form
router.get('/login', authenticate.getLogin);

// Fake register From
router.get('/register', authenticate.getRegister);


// Visiting this route logs the user out
router.get('/logout', authenticate.getLogout);

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;