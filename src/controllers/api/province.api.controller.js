const { provinceService } = require('../../services');

const findAll = async (req, res, next) => {
    try {
        const provinces = await provinceService.findAll();
        res.status(200).json(provinces);
    } catch (error) {
        next(error);
    }
};

const findById = async (req, res, next) => {
    try {
        const province = await provinceService.findById(req.params.id);
        res.status(200).json(province);
    } catch (error) {
        next(error);
    }
};

const findAllDistricts = async (req, res, next) => {
    try {
        const districts = await provinceService.findAllDistricts(req.params.id);
        res.status(200).json(districts);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    findAll,
    findById,
    findAllDistricts,
};
