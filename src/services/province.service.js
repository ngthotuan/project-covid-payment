const { sequelize } = require('../db');
const { ProvinceModel } = require('../models')(sequelize);

const findAll = async () => {
    return await ProvinceModel.findAll({ order: [['id', 'ASC']] });
};

const findById = async (id) => {
    return await ProvinceModel.findByPk(id);
};

const findAllDistricts = async (id) => {
    const province = await ProvinceModel.findByPk(id, {
        include: ['districts'],
    });
    return province.districts;
};

module.exports = {
    findAll,
    findById,
    findAllDistricts,
};
