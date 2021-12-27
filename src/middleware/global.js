const { menu } = require('../config');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.menu = menu;
        next();
    });
};
