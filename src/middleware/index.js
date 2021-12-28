function middleware(app) {
    require('./engine')(app);
    require('./common')(app);
    require('./global')(app);
    require('./passport')(app);
}
module.exports = middleware;
