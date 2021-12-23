const { productService } = require('../services');

const index = async (req, res, next) => {
    const products = await productService.findAll();
    res.render('products/list', { title: 'Danh sách sản phẩm', products });
};

const getCreate = (req, res, next) => {
    res.render('products/form', { title: 'Thêm sản phẩm' });
};

const postCreate = async (req, res, next) => {
    console.log(req.body);
    await productService.create(req.body);
    res.redirect('/products');
};

module.exports = {
    index,
    getCreate,
    postCreate,
};
