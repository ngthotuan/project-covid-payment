const { sequelize } = require('../db');
const { ProductModel } = require('../models')(sequelize);

const findAll = () => ProductModel.findAll();

const create = (product) => ProductModel.create(product);

module.exports = {
    findAll,
    create,
};
