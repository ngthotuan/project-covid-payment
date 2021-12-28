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

const save = async (patient) => {
    patient.dob = new Date(patient.dob);
    if (patient.parent_id === '') {
        delete patient['parent_id'];
    }
    if (patient.id === '') {
        delete patient['id'];
    }
    const hospital_histories = [];
    const accounts = [];
    const account = {};
    const hospital_history = {};

    account.username = patient.identity;
    const salt = bcrypt.genSaltSync(10);
    account.password = bcrypt.hashSync(patient.identity, salt);
    accounts.push(account);
    // AccountModel.create(account)

    hospital_history.import_time = new Date();
    hospital_history.hospital_name = '' + patient.hospital_id;
    hospital_histories.push(hospital_history);
    const patientSave = await PatientModel.create(
        {
            ...patient,
            accounts,
            hospital_histories,
        },
        {
            include: ['accounts', 'hospital_histories'],
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
    const patientSaved = await findById(patient.id);
    if (patientSaved.status !== patient.status) {
        const statusHistory = {};
        statusHistory.source = patientSaved.status;
        statusHistory.destination = patient.status;
        statusHistory.created_date = new Date();
        statusHistory.patient_id = patient.id;
        StatusHistoryModel.create(statusHistory);
        patientSaved.patients = patientSaved.patients.map((patient_item) => {
            if (patient_item.status > patient.status) {
                patient_item.status = parseInt(patient.status) + 1;
                return patient_item;
            }
        });
    }
    if (patientSaved.hospital_id !== patient.hospital_id) {
        const hospital_history = {};
        const length = patientSaved.hospital_histories.length;
        patientSaved.hospital_histories[length - 1].export_time = new Date();
        hospital_history.import_time = new Date();
        hospital_history.hospital_name = patient.hospital_id;
        patientSaved.hospital_histories.push(hospital_history);
    }
    const update = { ...patientSaved, ...patient };
    console.log(update.hospital_histories.length);
    const updatePatient = await PatientModel.update(update, {
        where: {
            id: patient.id,
        },
    });
    return updatePatient;
};

module.exports = {
    findAll,
    save,
    findById,
    update,
};
