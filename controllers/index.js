const router = require('express').Router();
const homeRoute = require('./home-routes');
const userRoute = require('./api/userRoute');
const dashboardRoute = require('./api/dashboardRoute');
const homepageRoute = require('./api/homepagePostRoute');
const commentRoute = require('./api/commentRoute');

router.use('/', homeRoute);
router.use('/api/dashboard', dashboardRoute);
router.use('/api/users', userRoute);
router.use('/api/post', homepageRoute);
router.use('/api/comment', commentRoute);

module.exports = router;
