const { sequelize } = require('../db');
const { CategoryModel } = require('../models')(sequelize);

function findAll() {
    return CategoryModel.findAll();
}

module.exports = {
    findAll,
};
