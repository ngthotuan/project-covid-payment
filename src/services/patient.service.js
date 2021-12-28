const { sequelize } = require('../db');
const bcrypt = require('bcrypt');

const {
    PatientModel,
    AccountModel,
    TransactionHistoryModel,
    HospitalHistoryModel,
    AccountHistoryModel,
    StatusHistoryModel,
} = require('../models')(sequelize);

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
    patient.dob = new Date(patientValue.dob);
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
                {
                    model: AccountModel,
                    as: 'accounts',
                    include: [
                        {
                            model: AccountHistoryModel,
                            as: 'account_histories',
                        },
                    ],
                },
                {
                    model: StatusHistoryModel,
                    as: 'status_histories',
                },
                {
                    model: HospitalHistoryModel,
                    as: 'hospital_histories',
                },
                {
                    model: TransactionHistoryModel,
                    as: 'transaction_histories',
                },
            ],
        });
        return patient;
    } catch (e) {
        console.log(e.message);
    }
};

const update = async (patient) => {
    const patientSaved = await PatientModel.findById(patient.id, {
        include: [{ all: true }],
    });
    if (patientSaved.status !== patient.status) {
        const statusHistory = {};
        statusHistory.source = patientSaved.status;
        statusHistory.destination = patient.status;
        patientSaved.status_histories.push(statusHistory);
    }
    if (patientSaved.hospital_id !== patient.hospital_id) {
        const hospital_history = {};
        const length = patientSaved.hospital_histories.length;
        patientSaved.hospital_histories[length - 1] = new Date();
        hospital_history.import_time = new Date();
        hospital_history.hospital_name = '' + patient.hospital_id;
        patientSaved.hospital_histories.push(hospital_history);
    }
    const update = { ...patientSaved, ...patient };
    const updatePatient = await PatientModel.save(update);
    return updatePatient;
};

module.exports = {
    findAll,
    save,
    findById,
    update,
};
