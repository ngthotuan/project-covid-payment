function index(req, res, next) {
    console.log('req ......', req.isAuthenticated());
    res.render('index', { title: 'Express' });
}

module.exports = {
    index,
};
