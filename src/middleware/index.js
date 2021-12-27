function middleware(app) {
    require('./engine')(app);
    require('./common')(app);
    require('./global')(app);
}
module.exports = middleware;
