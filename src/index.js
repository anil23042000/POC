const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const path = require('path');
const routes = require("./routes/file_route")
require('./config/file_db');

//const exphbs1 = require('express-handlebars');
const app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));


app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/Views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.use("/api", routes);
app.listen(4001, () => {
    console.log('Express server started at port : 4001');
});
