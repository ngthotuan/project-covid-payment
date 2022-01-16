function route(app) {
    app.use('/accounts', require('./account.route'));
}

module.exports = route;
