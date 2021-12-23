const { sequelize } = require('../db');
const { PatientModel } = require('../models')(sequelize);

const findAll = async (condition) => {
    return await PatientModel.findAndCountAll(condition);
};

const save = async (patient) => {
    // const parent  = PatientModel.update({
    //
    // },{
    //     where:{_id:parentId}
    // })
    const patientSave = await PatientModel.create(patient, {
        include: ['account'],
    });
    return patientSave;
};

const findById = async (patientId) => {
    try {
        const patient = await PatientModel.findOne({
            where: {
                id: patientId,
            },
            include: [
                {
                    model: PatientModel,
                    as: 'patients',
                    include: [{ all: true }],
                },
                {
                    model: PatientModel,
                    as: 'parent',
                    include: [{ all: true }],
                },
            ],
        });
        return patient;
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = {
    findAll,
    save,
    findById,
};
