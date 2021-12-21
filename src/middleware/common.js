const logger = require('morgan');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

function common(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(logger('dev'));
    app.use(expressLayouts);
}

module.exports = common;
