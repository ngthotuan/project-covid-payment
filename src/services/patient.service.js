const { sequelize } = require('../db');
const bcrypt = require('bcrypt');

const {
    PatientModel,
    AccountModel,
    TransactionHistoryModel,
    HospitalHistoryModel,
    AccountHistoryModel,
    StatusHistoryModel,
    HospitalModel,
} = require('../models')(sequelize);

const { RoleConstants } = require('../constants');

const findAll = async (condition) => {
    return await PatientModel.findAndCountAll(condition);
};

const save = async (patient) => {
    // clean data
    Object.keys(patient).forEach((key) => {
        if (patient[key] === '') {
            patient[key] = null;
        }
    });

    // create an account for the patient
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(patient.identity, salt);
    const account = {
        username: patient.identity,
        password: hash,
        role: RoleConstants.USER,
    };
    // update hospital current size
    const hospital = await HospitalModel.findByPk(patient.hospital_id);
    if (hospital.current_size === hospital.size) {
        return next(new Error('Hospital is full'));
    }
    await hospital.update({
        current_size: hospital.current_size + 1,
    });

    // update hospital history
    const hospital_history = {
        // hospital_id: patient.hospital_id,
        hospital_name: hospital.name,
        patient_id: patient.id,
        import_time: new Date(),
    };

    return await PatientModel.create(
        {
            ...patient,
            dob: new Date(patient.dob),
            accounts: [account],
            hospital_histories: [hospital_history],
        },
        {
            include: ['accounts', 'hospital_histories'],
        },
    );
};

const findById = async (patientId) => {
    try {
        const patient = await PatientModel.findByPk(patientId, {
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
    // // const patientBuild = PatientModel.build();
    // const patientSaved = await PatientModel.findByPk(patient.id);
    // // if (patientSaved.status !== patient.status) {
    // //     const statusHistory = {};
    // //     statusHistory.source = patientSaved.status;
    // //     statusHistory.destination = patient.status;
    // //     statusHistory.created_date = new Date();
    // //     patientSaved.hospital_histories.push(statusHistory)
    // //     // statusHistory.patient_id = patient.id;
    // //     // StatusHistoryModel.create(statusHistory);
    // //     patientSaved.patients = patientSaved.patients.map((patient_item) => {
    // //         if (patient_item.status > patient.status) {
    // //             patient_item.status = parseInt(patient.status) + 1;
    // //             return patient_item;
    // //         }
    // //     });
    // // }
    // // if (patientSaved.hospital_id !== patient.hospital_id) {
    // //     const hospital_history = {};
    // //     const length = patientSaved.hospital_histories.length;
    // //     patientSaved.hospital_histories[length - 1].export_time = new Date();
    // //     hospital_history.import_time = new Date();
    // //     hospital_history.hospital_name = patient.hospital_id;
    // //     patientSaved.hospital_histories.push(hospital_history);
    // // }
    // // console.log(update.hospital_histories.length);
    // return PatientModel.update( patient,{
    //     where: {
    //         id: patient.id,
    //     },
    //     transaction: t
    // }).then(result => {
    //     const statusHistory = {};
    //     statusHistory.source = patientSaved.status;
    //     statusHistory.destination = patient.status;
    //     statusHistory.created_date = new Date();
    //     StatusHistoryModel.create(statusHistory)
    //
    //     const hospital_history = {};
    //     // const length = patientSaved.hospital_histories.length;
    //     // patientSaved.hospital_histories[length - 1].export_time = new Date();
    //     hospital_history.import_time = new Date();
    //     hospital_history.hospital_name = patient.hospital_id;
    //     HospitalHistoryModel.create(hospital_history)
    //
    //
    // }).catch(e =>{
    //     console.log(e)
    // });
    // return updatePatient;
};

module.exports = {
    findAll,
    save,
    findById,
    update,
};
