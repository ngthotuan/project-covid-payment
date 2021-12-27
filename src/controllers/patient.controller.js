const {
    patientService,
    provinceService,
    hospitalService,
} = require('../services');
const { PatientStatusConstant } = require('../constants/');
const { Op } = require('sequelize');

const getList = async (req, res, next) => {
    const page = req.query?.page ? req.query.page : 0;
    const pageSize = req.query?.page_size ? req.query.page_size : 10;
    const offset = page * pageSize;
    const limit = pageSize;

    const condition = {
        where: req.query,
        include: ['ward', 'district', 'province', 'hospital'],
        // offset,
        // limit
    };
    if (req.query.id != null) return next();
    const listPatient = await patientService.findAll(condition);
    res.render('patients/list', { listPatient });
};
const getCreate = async (req, res, next) => {
    const condition = {
        where: {
            size: {
                [Op.gt]: {
                    [Op.col]: 'hospital.current_size',
                },
            },
        },
    };
    const patients = await patientService.findAll({});
    console.log(patients.rows);
    const provinces = await provinceService.findAll();
    const hospitals = await hospitalService.findAll(condition);
    res.render('patients/form', {
        title: 'Thêm bệnh nhân',
        provinces,
        statuses: PatientStatusConstant,
        hospitals,
        patients: patients.rows,
    });
};

const getDetail = async (req, res, next) => {
    const patientFind = await patientService.findById(req.query.id);
    res.render('patients/detail', { patientFind });
    // res.json(patientFind)
};
const postCreate = async (req, res, next) => {
    // console.log(req.body)
    try {
        await patientService.save(req.body);
        res.redirect('/patients');
    } catch (e) {
        console.log(e);
    }
};
module.exports = {
    getList,
    getCreate,
    postCreate,
    getDetail,
};
