const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth')

       
 router.get('/dashboard', withAuth, (req, res) => {
     console.log("=====================")
     console.log("dashboard-route")
     console.log(req)
     console.log("=====================")
     // If the user is already logged in, redirect the request to another route
     if (req.session.logged_in) {
       res.render('/api/dashboard', {
         title: "The Tech Blog", 
         user: req.session.username
       });
       return;
     }
  
     res.redirect('login');
   });

   module.exports = router