const { accountService } = require('../services');
const passport = require('passport');
const bcrypt = require('bcrypt');

const getProfile = async (req, res, next) => {
    const include = {
        include: ['account_histories'],
    };
    const user = await accountService.findwithCondition(req.user.id, include);

    res.render('home', {
        user,
    });
};

const getChangePassword = (req, res, next) => {
    res.render('authen/change-password');
};

const postChangePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!bcrypt.compareSync(oldPassword, req.user.password)) {
        req.flash('error_msg', 'Mật khẩu cũ không chính xác!');
    } else {
        try {
            await accountService.changePassword(req.user.id, newPassword);
            req.flash('success_msg', 'Thay đổi mật khẩu thành công!');
        } catch (error) {
            console.error('user.controller change password', error);
            req.flash('error_msg', 'Thay đổi mật khẩu thất bại!');
        }
    }
    res.redirect('/change-password');
};

const getDeposit = async (req, res, next) => {
    const account = await accountService.findAccountByUsername(
        req.user.username,
    );
    res.render('user-deposit', { user: account });
};
const postDeposit = async (req, res, next) => {
    const result = await accountService.deposit(
        req.user.username,
        req.body.amount,
    );
    if (result) {
        req.flash('', 'Nạp tiền thành công');
    } else {
        req.flash('', 'Nạp tiền thất bại');
    }
    res.redirect('/deposit');
};
const getLogout = (req, res, next) => {
    req.logout();
    res.redirect('/login');
};

const getLoginUsername = async (req, res, next) => {
    const username = req.flash('username')[0] || '';
    const isInit = (await accountService.count()) === 0;
    if (isInit) {
        return res.redirect('/init');
    }
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

const getInit = async (req, res, next) => {
    const isInit = (await accountService.count()) === 0;
    if (!isInit) {
        return res.redirect('/');
    }
    res.render('authen/init', {
        layout: 'layouts/layout',
    });
};

const postInit = async (req, res) => {
    const { username, password } = req.body;
    await accountService.createMasterAccount(username, password);
    req.flash('success_msg', 'Tạo tài khoản thành công');
    return res.redirect('/login');
};

module.exports = {
    getLoginCreate,
    getLoginPassword,
    getLogout,
    getLoginUsername,
    postLoginCreate,
    postLoginPassword,
    postLoginUsername,
    getDeposit,
    postDeposit,
    getProfile,
    getChangePassword,
    postChangePassword,
    getInit,
    postInit,
};
