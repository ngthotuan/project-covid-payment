function route(app) {
    app.use('/', require('./site.route'));
    app.use('/account', require('./account.route'));
}

module.exports = route;
