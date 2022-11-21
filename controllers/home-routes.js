const router = require('express').Router();
const{Comment, Post, User} = require('../models')

//when in post it 3will try to find all all
router.get('/post', async (req,res) => {
    const postData = await Post.findAll()
    console.log(postData)
    //serialize the data
    const posts = postData.map(Post => Post.get({plain:true}))
    //it will look fro homepage.handlebars, it will pass in posts in line 9 also it will  
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

router.get('/dashboard', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/dashboard');
        return;
    }
    res.render('dashboard');
});

router.get('/new-post', (req, res) => {
    if(req.session.logged_in){
        res.redirect('/post');
        return;
    }
    res.render('newPost');
});


router.get("/")

module.exports = router;