const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const path = require('path');

//Set Template Engine
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:path.join(__dirname,'ui/views/layout')}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'ui/views'));

//Middleware to parse json body and url body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Middleware to use static files.
app.use(express.static(path.join(__dirname, 'public')));


app.use('/',(req,res,next)=>{
    res.render('home');
});

//Mongo connection via mongoose
require('./util/mongo');
app.listen(8080);

module.exports = app;

