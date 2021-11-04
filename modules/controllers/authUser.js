const passport = require('passport');
const genPassword = require('../lib/passUtils').genPassword;





exports.postLogin = passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: 'login-success'
});




exports.postRegister = (req, res, next) => {
    const genHash = genPassword(req.body.password);


    const newUser = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: genHash
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    next();
}


exports.getLogin = (req, res, next) => {

    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="userName">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

};

exports.getRegister = (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="userName">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

};



exports.getLogout = (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
};