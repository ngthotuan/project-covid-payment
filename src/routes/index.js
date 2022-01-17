const { checkAuthenAndAuthor } = require('../middleware/authentication');
function route(app) {
    app.use('/', require('./site.route'));
    app.use('/api', require('./api'));
    app.use(checkAuthenAndAuthor);
    app.use('/payment', require('./payment.route'));
}

module.exports = route;
