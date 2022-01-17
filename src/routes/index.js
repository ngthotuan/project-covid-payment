function route(app) {
    app.use('/', require('./site.route'));
}

module.exports = route;
