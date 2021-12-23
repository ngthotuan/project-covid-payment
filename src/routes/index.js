function route(app) {
    app.use('/', require('./site.route'));
    app.use('/accounts', require('./account.route'));
    app.use('/patients', require('./patient.route'));
    app.use('/products', require('./product.route'));
    app.use('/categories', require('./category.route'));
}

module.exports = route;
