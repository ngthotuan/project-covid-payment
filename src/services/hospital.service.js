const { sequelize } = require('../db');
const { hospital: Hospital } = require('../models')(sequelize);
const deleteHospital = async (id) => {
    const hospital = await Hospital.findByPk(id);
    hospital
        .destroy()
        .then((result) => {
            return result;
        })
        .catch((err) => console.log(err.message));
};

module.exports = {
    deleteHospital,
};
