const router = require('express').Router();
const{Comment, Post, User} = require('../models')

//when in post it 3will try to find all all
router.get('/post', async (req,res) => {
    const postData = await Post.findAll()
    console.log(postData)
    //serialize the data
    const posts = postData.map(Post => Post.get({plain:true}))
    //it will look fro homepage.handlebars, it will pass in posts in line 9 also it will  
    res.render("Homepage", {posts, loggedIn: req.session.loggedIn});
})


router.get('/', (req,res) => {
    if(req.session.loggedn){
        res.redirect('/dashboard');
       
    }
    res.redirect('/api/post');
});

router.get('/login', (req,res) => {
    if(req.session.loggedIn){
        res.redirect('/dashboard');
        return;
    }
    res.render('login')
});

router.get('/signup', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

router.get('/dashboard', (req, res) => {
    console.log("Dashboard",req.session.loggedIn)
    if(req.session.loggedIn){
        res.redirect('/api/users/dashboard');
        return;
    }
    res.redirect("/")
});

router.get('/new-post', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/post');
        return;
    }
    res.render('newPost');
});


router.get("/")

module.exports = router;