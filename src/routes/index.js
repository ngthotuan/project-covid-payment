const { checkAuthenAndAuthor } = require('../middleware/authentication');
function route(app) {
    app.use('/', require('./site.route'));
    app.use(checkAuthenAndAuthor);
    app.use('/payment', require('./payment.route'));
}

module.exports = route;
