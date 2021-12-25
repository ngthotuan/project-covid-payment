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
    const products = req.body.product_id;
    const limitProducts = req.body.limit_product;
    const product_categories = [];

    for (let i = 0; i < products.length; i++) {
        const product_id = products[i];
        const limit_product = limitProducts[i];
        if (product_id && limit_product) {
            product_categories.push({
                product_id,
                limit_product,
            });
        }
    }

    const category = {
        name: req.body.name,
        limit_person: req.body.limit_person,
        limit_time: req.body.limit_time,
        product_categories,
    };

    const categorySaved = await categoryService.createCategory2(category);
    res.redirect('/categories');
};

module.exports = {
    list,
    showCreate,
    create,
};
