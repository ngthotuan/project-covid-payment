const { accountService } = require('../services');

function index(req, res, next) {
    // accountService
    //     .findAll()
    //     .then((accounts) => res.json(accounts))
    //     .catch((err) => next(err));
    res.render('index');
}
const getDeposit = async (req, res, next) => {
    res.render('user-deposit', { user: req.user });
};
const postDeposit = async (req, res, next) => {
    const result = await accountService.deposit(req.username, req.amount);
    if (result) {
        req.flash('', 'Nạp tiền thành công');
    } else {
        req.flash('', 'Nạp tiền thất bại');
    }
    res.redirect('/deposit');
};

module.exports = {
    index,
    getDeposit,
    postDeposit,
};
