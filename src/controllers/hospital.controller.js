const { hospitalService } = require('../services');

async function deleteHistory(req, res, next) {
    const result = await hospitalService.deleteHospital(req.body.id);
    res.json(result);
}

module.exports = {
    deleteHistory,
};
