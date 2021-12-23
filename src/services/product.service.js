const { sequelize } = require('../db');
const { ProductModel } = require('../models')(sequelize);

const findAll = () => ProductModel.findAll();

const create = (product) => ProductModel.create(product, { include: 'images' });

const findById = (id) => ProductModel.findByPk(id, { include: ['images'] });

const update = async (id, data) => {
    const { name, amount, unit } = data;
    const product = await ProductModel.findByPk(id);
    product.update({
        name,
        amount,
        unit,
        images: data.images,
    });
    await product.save();
};

const remove = async (id) => {
    const product = await ProductModel.findByPk(id);
    await product.destroy();
};
module.exports = {
    findAll,
    create,
    findById,
    update,
    remove,
};
