
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const bodyParser = require('body-parser');
const hbs = require('express-handlebars');


const express = require('express');
const app = express();
const uiRoute = require('./ui/routes/route-ui');
const apiRouter = require('./api/routes/route-api');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

//Set Template Engine
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:path.join(__dirname,'ui/views/layout')}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'ui/views'));

//Middleware to parse json body and url body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
//Middleware to use static files.
app.use(express.static(path.join(__dirname, 'public')));


const sessionStore = new MongoDBStore({
    uri:'mongodb://localhost/user-auth',
    collection: 'sessions'
});

app.use(session
    ({
    
    secret: 'triangle',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
  }));


app.use((req,res,next)=>{
   
    if(!res.locals.isAuth)
        res.locals.isAuth = req.session.isLoggedIn;

    next();
});

app.use('/api',apiRouter);
app.use(uiRoute);

//Mongo connection via mongoose
require('./util/mongo');
app.listen(8080);

module.exports = app;

