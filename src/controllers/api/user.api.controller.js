const { accountService } = require('../../services');

const createUser = async (req, res, next) => {
    try {
        const user = await accountService.createUser(req.body.username);
        console.log(user);
        return res.json(user);
    } catch (e) {
        console.log('da vao');
        return res.status(400).send('Bad Request');
    }
};

module.exports = {
    createUser,
};
