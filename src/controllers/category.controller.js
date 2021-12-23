const { categoryService, productService } = require('../services');

const list = async (req, res, next) => {
    const categories = await categoryService.findAll();
    res.render('categories/list', { title: 'Danh sách gói', categories });
};

const showCreate = async (req, res, next) => {
    const products = await productService.findAll();
    res.render('categories/form', { title: 'Tạo gói', products });
};

const create = async (req, res, next) => {
    const category = {
        name: req.body.name,
        limit_person: req.body.limit_person,
        limit_time: req.body.limit_time,
    };
    const products = req.body.product_id;
    const limitProduct = req.body.limit_product;
    const categorySaved = await categoryService.createCategory(
        category,
        products,
        limitProduct,
    );
    res.redirect('/categories');
};

module.exports = {
    list,
    showCreate,
    create,
};
