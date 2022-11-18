const router = require('express').Router();
const{Comments, Post, User} = require('../models')

router.get('/', (req,res) => {
    if(req.session.logged_in){
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/login', (req,res) => {
    if(req.session.logged_in){
        res.redirect('/dashboard');
        return;
    }
    res.render('login')
});

router.get('/signup', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

module.exports = router;