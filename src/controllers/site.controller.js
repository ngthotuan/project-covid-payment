const { accountService } = require('../services');
const passport = require('passport');

const getLogout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
};

const getLoginUsername = (req, res, next) => {
    const username = req.flash('username')[0] || '';
    res.render('authen/form-username', {
        layout: 'layouts/layout',
        username,
    });
};

const postLoginUsername = async (req, res, next) => {
    const username = req.body.username;
    const account = await accountService.findAccountByUsername(username);
    if (!account) {
        req.flash('error_msg', 'User không tồn tại');
        req.flash('username', username);
        res.redirect('/login');
    } else if (!account.password) {
        req.flash('username', username);
        res.redirect('/login/create');
    } else {
        req.flash('username', username);
        res.redirect('/login/password');
    }
};

const getLoginPassword = (req, res, next) => {
    const password = req.flash('password')[0] || '';
    const username = req.flash('username')[0] || '';
    if (!username || username === '') {
        return res.redirect('/login');
    }
    res.render('authen/form-password', {
        username,
        password,
        layout: 'layouts/layout',
    });
};

const postLoginPassword = (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
            req.flash('error_msg', info.message);
            req.flash('username', info.username);
            req.flash('password', info.password);
            return res.redirect('/login/password');
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.redirect('/login');
            }
            return res.redirect('/');
        });
    })(req, res, next);
};

const getLoginCreate = async (req, res, next) => {
    const username = req.flash('username')[0] || '';
    const password = req.flash('password')[0] || '';
    if (!username || username === '') {
        return res.redirect('/login');
    }
    res.render('authen/form-create-password', {
        username,
        password,
        layout: 'layouts/layout',
    });
};

const postLoginCreate = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        req.flash('username', username);
        req.flash('password', password);
        req.flash('error_msg', 'Thiếu trường username hoặc password');
        return res.redirect('/login/create');
    }

    try {
        const account = await accountService.createPasswordInLogin(
            username,
            password,
        );
        req.flash('success_msg', 'Tạo mật khẩu thành công');
        return res.redirect('/login');
    } catch (err) {
        req.flash('username', username);
        req.flash('password', password);
        req.flash('error_msg', 'Đã có lỗi xảy ra');
        return res.redirect('/login/create');
    }
};

module.exports = {
    getLoginCreate,
    getLoginPassword,
    getLogout,
    getLoginUsername,
    postLoginCreate,
    postLoginPassword,
    postLoginUsername,
};
