const { productService } = require('../services');

const index = async (req, res, next) => {
    try {
        const products = await productService.findAll();
        res.render('products/list', { title: 'Danh sách sản phẩm', products });
    } catch (error) {
        next(error);
    }
};

const getCreate = (req, res, next) => {
    res.render('products/form', { title: 'Thêm sản phẩm' });
};

const postCreate = async (req, res, next) => {
    try {
        req.body.images = req.files.map((file) => {
            return {
                path: file.filename,
            };
        });
        await productService.create(req.body);
        res.redirect('/products');
    } catch (error) {
        next(error);
    }
};

const getEdit = async (req, res, next) => {
    try {
        const product = await productService.findById(req.params.id);
        res.render('products/form', { title: 'Sửa sản phẩm', product });
    } catch (error) {
        next(error);
    }
};

const postEdit = async (req, res, next) => {
    try {
        const id = req.params.id;
        req.body.files = req.files.map((file) => {
            return {
                path: file.filename,
            };
        });
        await productService.update(id, req.body);
        res.redirect('/products');
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const id = req.params.id;
        await productService.remove(id);
        res.redirect('/products');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    index,
    getCreate,
    postCreate,
    getEdit,
    postEdit,
    remove,
};
