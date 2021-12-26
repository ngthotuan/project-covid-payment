const { districtService } = require('../../services');

const findById = async (req, res, next) => {
    try {
        const district = await districtService.findById(req.params.id);
        res.status(200).json(district);
    } catch (error) {
        next(error);
    }
};

const findAllWards = async (req, res, next) => {
    try {
        const wards = await districtService.findAllWards(req.params.id);
        res.status(200).json(wards);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    findById,
    findAllWards,
};
