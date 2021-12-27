const siteRouter = require('./site');
// const testRouter = require('./test');

function route(app) {
  app.use('/', siteRouter);
  // app.use('/test', testRouter);
}

module.exports = route;
