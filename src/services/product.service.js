const { sequelize } = require('../db');
const { ProductModel } = require('../models')(sequelize);

function findAll() {
    return ProductModel.findAll();
}

module.exports = {
    findAll,
};
