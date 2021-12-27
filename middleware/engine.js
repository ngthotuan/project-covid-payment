const path = require("path");

function engine(app) {
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');
    app.set('layout', '../views/layouts/full-layout');
    app.set("layout extractStyles", true);
    app.set('layout extractScripts', true);
}

module.exports = engine;
