const router = require('express').Router();

const userRoute = require('./userRoute');
const dashboardRoute = require('./dashboardRoute');
const homepageRoute = require('./homepagePostRoute');
const commentRoute = require('./commentRoute');

router.use('/dashboard', dashboardRoute);
router.use('/users', userRoute);
router.use('/post', homepageRoute);
router.use('/comment', commentRoute);

module.exports = router;
