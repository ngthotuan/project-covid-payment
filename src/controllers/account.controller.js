const { accountService } = require('../services');

function list(req, res, next) {
    accountService
        .findAll()
        .then((accounts) => res.json(accounts))
        .catch((err) => next(err));
}

module.exports = {
    list,
};
