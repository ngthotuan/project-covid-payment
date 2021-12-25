const { sequelize } = require('../db');
const { CategoryModel, ProductCategoryModel } = require('../models')(sequelize);

const findAll = () => {
    return CategoryModel.findAll();
};

const createCategory = async (category, products, limitProducts) => {
    const categorySave = await CategoryModel.create(category);
    await categorySave.save();
    for (let i = 0; i < products.length; i++) {
        const product_id = products[i];
        const limit_product = limitProducts[i];
        const category_id = categorySave.id;
        if (product_id) {
            const productCategory = await ProductCategoryModel.create({
                category_id,
                product_id,
                limit_product,
            });
            await productCategory.save();
        }
    }
};
const createCategory2 = async (category) => {
    const categorySave = await CategoryModel.create(category, {
        include: 'product_categories',
    });
    return categorySave;
};

module.exports = {
    findAll,
    createCategory,
    createCategory2,
};
