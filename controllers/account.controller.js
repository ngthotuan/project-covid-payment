const {accountService} = require('../services');

function add(req, res, next) {
    // add account
    // accountService.add(req.body)
    //     .then(account => res.json(account))
    //     .catch(err => next(err));
}

module.exports = {
    add
};
