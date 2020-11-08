const express = require('express');
const router = express.Router();
const {ensureAuthentificated} = require("../config/auth.js")

//Login Page
router.get('/', (req, res) => {
    res.render('welcome');
})
//Register Page
router.get('/register', (req, res) => {
    res.render('register');
})

//Dashboard Page
router.get('/dashboard', ensureAuthentificated, (req,res) => {
    res.render('dashboard', {
        user: req.user
    });
})

module.exports = router;