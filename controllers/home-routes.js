const router = require('express').Router();
const{Comment, Post, User} = require('../models')

router.get('/post', async (req,res) => {
    const postData = await Post.findAll()
    console.log(postData)
    const posts = postData.map(Post => Post.get({plain:true}))
    res.render("Homepage", {posts, logged_in: req.session.logged_in});
})


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

router.get("/")

module.exports = router;