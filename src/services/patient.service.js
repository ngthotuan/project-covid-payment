const { sequelize } = require('../db');
const bcrypt = require('bcrypt');

const { PatientModel, AccountModel } = require('../models')(sequelize);

const findAll = async (condition) => {
    return await PatientModel.findAndCountAll(condition);
};

const save = async (patientValue) => {
    // const parent  = PatientModel.update({
    //
    // },{
    //     where:{_id:parentId}
    // })
    let patient = { ...patientValue };
    patient.debt = parseInt(patient.debt);
    patient.credit = parseInt(patient.credit);
    if (patient.parent_id === '') {
        delete patient['parent_id'];
    }
    const accounts = [];
    const account = {};

    account.username = patient.name;
    const salt = bcrypt.genSaltSync(10);
    account.password = bcrypt.hashSync(patient.name, salt);
    accounts.push(account);

    console.log(account);
    const patientSave = await PatientModel.create(
        {
            ...patient,
            accounts,
        },
        {
            include: ['accounts'],
        },
    );
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
