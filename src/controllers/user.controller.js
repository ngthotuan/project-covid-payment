const { patientService, AccountHistoryService } = require('../services');
const index = async (req, res, next) => {};
const getProfile = async (req, res, next) => {
    const include = {
        include: ['hospital'],
    };
    console.log(req.user.id);
    const patient = await patientService.findByIdWithInclude(
        req.user.patient_id,
        include,
    );
    console.log(patient);
    res.render('users/user-profile', { patient });
};
const getUserHistories = async (req, res, next) => {
    const include = {
        include: ['status_histories', 'hospital_histories'],
    };
    const condition = {
        where: { account_id: req.user.id },
    };
    const patient = await patientService.findByIdWithInclude(
        req.user.patient_id,
        include,
    );
    const accountHistory = await AccountHistoryService.findAll(condition);
    // console.log(patient)
    res.render('users/user-history', {
        patient,
        account_histories: accountHistory,
    });
};
const getTransactionHistory = async (req, res, next) => {
    const include = {
        include: ['transaction_histories'],
    };
    console.log(req.user.id);
    const patient = await patientService.findByIdWithInclude(
        req.user.patient_id,
        include,
    );
    console.log(patient);
    res.render('users/user-transaction-history', { patient });
};
const getBuyHistory = async (req, res, next) => {
    const include = {
        include: ['orders'],
    };
    console.log(req.user.id);
    const patient = await patientService.findByIdWithInclude(
        req.user.patient_id,
        include,
    );
    console.log(patient);
    res.render('users/user-buy-history', { patient });
};
module.exports = {
    index,
    getProfile,
    getTransactionHistory,
    getUserHistories,
    getBuyHistory,
};
