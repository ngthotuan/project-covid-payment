function index(req, res, next) {
    res.render('products/list', { title: 'Danh sách sản phẩm' });
}

module.exports = {
    index,
};
