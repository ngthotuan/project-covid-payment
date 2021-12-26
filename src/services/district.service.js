const { sequelize } = require('../db');
const { DistrictModel } = require('../models')(sequelize);

const findById = async (id) => {
    return await DistrictModel.findByPk(id);
};

const findAllWards = async (id) => {
    const province = await DistrictModel.findByPk(id, {
        include: ['wards'],
    });
    return province.wards;
};

module.exports = {
    findById,
    findAllWards,
};
