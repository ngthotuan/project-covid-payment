const { checkAuthenAndAuthor } = require('../middleware/authentication');
function route(app) {
    app.use('/accounts', require('./account.route'));
    app.use('/patients', require('./patient.route'));
    app.use('/products', require('./product.route'));
    app.use('/categories', require('./category.route'));
    app.use('/hospitals', require('./hospital.route'));
    app.use('/api', require('./api'));
    app.use('/', require('./site.route'));
}

module.exports = route;
