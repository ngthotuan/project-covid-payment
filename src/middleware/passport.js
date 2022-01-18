const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { accountService } = require('../services');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(async (username, password, done) => {
            let user;
            try {
                user = await accountService.findAccountByUsername(username);
                if (!user) {
                    return done(null, false, {
                        message: 'Tài khoản không tồn tại.',
                        username,
                        password,
                    });
                }
                const checkPasswordValid = bcrypt.compareSync(
                    password,
                    user.password,
                );

                if (!checkPasswordValid) {
                    return done(null, false, {
                        message: 'Mật khẩu không đúng.',
                        username,
                        password,
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(true, false, {
                    message: 'Đã xảy ra lỗi.',
                    username,
                    password,
                });
            }
        }),
    );

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(async (username, done) => {
        try {
            const user = await accountService.findAccountByUsername(username);
            done(null, user);
        } catch (error) {
            done('Đã có lỗi xày ra');
        }
    });
};
