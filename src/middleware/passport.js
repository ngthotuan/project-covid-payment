const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { accountService } = require('../services');

module.exports = (app) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            let user;
            try {
                user = await accountService.findAccountByUsername(username);
                if (!user) {
                    return done(null, false, {
                        message: 'Tài khoản không tồn tại.',
                    });
                }
                const checkPasswordValid = bcrypt.compareSync(
                    password,
                    user.password,
                );
                if (!checkPasswordValid) {
                    return done(null, false, {
                        message: 'Mật khẩu không đúng.',
                    });
                }
                return done(null, user);
            } catch (error) {
                return done('Đã xảy ra lỗi');
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

    app.use(passport.initialize());
    app.use(passport.session());
};
