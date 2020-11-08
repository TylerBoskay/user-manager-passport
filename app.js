const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require("./config/passport") (passport)

//Mongoose
mongoose.connect('mongodb+srv://tboskk-admin:Rocker245%21@cluster0.d89ar.gcp.mongodb.net/authen-app?retryWrites=true&w=majority',
{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log('Connection to MongoDB established successfully.'))
.catch((err) => console.log('Error Connecting to MongoDB: ' + err));

//EJS
app.set('view engine', 'ejs');
app.use(expressEjsLayout);

//Body Parser
app.use(express.urlencoded({extended: false}));

//Express Session
app.use(session({
    secret: 'thisismysecret',
    resave: true,
    saveUninitialized: true
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Use Flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(3000);