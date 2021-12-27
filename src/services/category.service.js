const { sequelize } = require('../db');
const { CategoryModel, ProductCategoryModel, ProductModel } =
    require('../models')(sequelize);

const createCategoryNull = () => {
    return CategoryModel.build();
};

const findAll = () => {
    return CategoryModel.findAll();
};

const createCategory = async (category) => {
    const categorySave = await CategoryModel.create(category, {
        include: 'product_categories',
    });
    return categorySave;
};

const findById = (id) => {
    return CategoryModel.findByPk(id, {
        include: 'product_categories',
    });
};

const findCategoryIncludeProduct = async (idCategory) => {
    try {
        const category = await CategoryModel.findByPk(idCategory, {
            include: {
                model: ProductCategoryModel,
                as: 'product_categories',
                include: {
                    model: ProductModel,
                    as: 'product',
                },
            },
        });
        return category;
    } catch (e) {
        console.log(e.message);
    }
};

const destroy = async (id) => {
    const category = await CategoryModel.findByPk(id, {
        include: 'product_categories',
    });
    if (category) {
        const productCategories = category.product_categories;
        for (let i = 0; i < productCategories.length; i++) {
            const productCategory = productCategories[i];
            await productCategory.destroy();
        }
        await category.destroy();
    }
    return category;
};

const update = async (category) => {
    const categorySave = await CategoryModel.create(category, {
        include: 'product_categories',
    });
    return categorySave;
};

module.exports = {
    findAll,
    createCategory,
    destroy,
    findById,
    createCategoryNull,
    findCategoryIncludeProduct,
};
