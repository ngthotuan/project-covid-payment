const { sequelize } = require('../db');
const { ProductCategoryModel } = require('../models')(sequelize);

function findAll() {
    return ProductCategoryModel.findAll();
}

module.exports = {
    findAll,
};
