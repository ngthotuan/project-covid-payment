const { checkAuthenAndAuthor } = require('../middleware/authentication');
function route(app) {
    app.use('/accounts', require('./account.route'));
    app.use('/patients', checkAuthenAndAuthor, require('./patient.route'));
    app.use('/products', checkAuthenAndAuthor, require('./product.route'));
    app.use('/categories', checkAuthenAndAuthor, require('./category.route'));
    app.use('/hospitals', require('./hospital.route'));
    app.use('/api', require('./api'));
    app.use('/', require('./site.route'));
}

module.exports = route;
