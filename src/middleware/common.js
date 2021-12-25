const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');

function common(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(
        session({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 60000 },
        }),
    );
    app.use(flash());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use('/product-images', express.static('uploads'));
    app.use(logger('dev'));
    app.use(expressLayouts);

    app.use('/', (req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        console.log(res.locals);
        next();
    });
}

module.exports = common;
