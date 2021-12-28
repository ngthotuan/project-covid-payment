const { accountService } = require('../services');
const passport = require('passport');

function list(req, res, next) {
    accountService
        .findAll()
        .then((accounts) => res.json(accounts))
        .catch((err) => next(err));
}

const getLoginUsername = (req, res, next) => {
    res.render('accounts/form-username', { layout: 'layouts/layout' });
};

const postLoginUsername = async (req, res, next) => {
    const username = req.body.username;
    const account = await accountService.findAccountByUsername(username);
    if (!account) {
        req.flash('error_msg', 'User không tồn tại');
        res.redirect('/accounts/login');
    } else if (!account.password) {
        res.render('accounts/form-create-password');
    } else {
        res.render('accounts/form-password');
    }
};

const postLogin = (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.render('accounts/form-password', {
                error_msg: 'Mật khẩu không đúng',
            });
        }
        if (!user) {
            return res.render('accounts/form-password', {
                error_msg: 'Mật khẩu không đúng',
            });
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.render('account/signin', {});
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

module.exports = {
    list,
    getLoginUsername,
    postLoginUsername,
    postLogin,
};
