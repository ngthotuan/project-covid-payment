function index(req, res, next) {
    res.render('products/list', { title: 'Danh sách sản phẩm' });
}

function newProduct(req, res, next) {
    res.render('products/form', { title: 'Thêm sản phẩm' });
}

module.exports = {
    index,
    newProduct,
};
