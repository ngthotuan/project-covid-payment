const {
    accountService,
    categoryService,
    productService,
} = require('../services');

const {} = require('../services');

const getList = async (req, res, next) => {
    const categories = await categoryService.findAll();
    res.render('categories/list', {
        title: 'Danh sách gói',
        role: 'USER',
        categories,
    });
};

const detail = async (req, res, next) => {
    const id = req.params.id;
    const category = await categoryService.findCategoryIncludeProduct(id);
    res.render('categories/view', {
        title: 'Chi tiết gói',
        role: 'USER',
        category,
    });
};

const index = async (req, res, next) => {};

module.exports = {
    index,
    getList,
    detail,
};
