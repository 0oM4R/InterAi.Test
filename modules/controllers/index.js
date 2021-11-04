exports.home = (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
};