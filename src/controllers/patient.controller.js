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
    try {
        await patientService.save(req.body);
    } catch (e) {
        req.flash('error_msg', 'Chứng minh nhân dân của người này đã tồn tại');
        res.redirect('back');
    }
};
const getUpdate = async (req, res, next) => {
    const condition = {
        where: {
            size: {
                [Op.gt]: {
                    [Op.col]: 'hospital.current_size',
                },
            },
        },
    };
    const patient = await patientService.findById(req.params.id);
    const patients = await patientService.findAll({
        where: { id: { [Op.ne]: req.params.id } },
    });
    const provinces = await provinceService.findAll();
    const hospitals = await hospitalService.findAll(condition);
    res.render('patients/form', {
        title: 'Sửa thông tin bệnh nhân',
        provinces,
        statuses: PatientStatusConstant,
        hospitals,
        patients: patients.rows,
        patient,
    });
};
const postUpdate = async (req, res, next) => {
    try {
        const patientUpdate = await patientService.update({ ...req.body });
        res.redirect('back');
    } catch (e) {
        console.log(e);
    }
};
module.exports = {
    getList,
    getCreate,
    postCreate,
    getDetail,
    getUpdate,
    postUpdate,
};
