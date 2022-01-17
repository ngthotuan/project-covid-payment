function route(app) {
    app.use('/', require('./site.route'));
    app.use('/payment', require('./payment.route'));
}

module.exports = route;
