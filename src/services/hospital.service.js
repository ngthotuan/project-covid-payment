const { sequelize } = require('../db');

const { HospitalModel } = require('../models')(sequelize);

const findAll = (condition) => HospitalModel.findAll(condition);

const create = (hospital) => HospitalModel.create(hospital);

const findById = (id) => HospitalModel.findByPk(id);

const update = async (id, data) => {
    const hospital = await HospitalModel.findByPk(id);
    hospital.update(data);
    return await hospital.save();
};

const remove = async (id) => {
    const hospital = await HospitalModel.findByPk(id);
    await hospital.destroy();
};
const findByCriteria = async (criteria) => {
    const hospitals = await HospitalModel.findAll();
};
module.exports = {
    findAll,
    create,
    findById,
    update,
    remove,
};
