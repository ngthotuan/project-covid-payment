const checkAuthenAndAuthor = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};

module.exports = {
    checkAuthenAndAuthor,
};
