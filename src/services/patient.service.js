const { sequelize } = require('../db');
const { PatientModel } = require('../models')(sequelize);

function findAll() {
    return PatientModel.findAll();
}

module.exports = {
    findAll,
};
