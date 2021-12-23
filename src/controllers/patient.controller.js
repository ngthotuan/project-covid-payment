const { patientService } = require('../services');

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
const getCreate = (req, res, next) => {
    res.render('patients/form');
};

const postCreate = async (req, res, next) => {
    const patientSave = await patientService.save(req.body);
    res.redirect('/');
};

const getDetail = async (req, res, next) => {
    const patientFind = await patientService.findById(req.query.id);
    res.render('patients/detail', { patientFind });
    // res.json(patientFind)
};
// const getDetail = async (req,res, next) =>{
//
// }
module.exports = {
    getList,
    getCreate,
    postCreate,
    getDetail,
};
