const router = require('express').Router();
const userRouter = require('./userRoute');
const dashboardRoute = require('./dashboardRoute');
const postRoute = require('./postRoute');
const commentRoute = require('./commentRoute');

router.use('/dashboard', dashboardRoute);
router.use('/users', userRouter);
router.use('/post', postRoute)
router.use('/comment', commentRoute)

module.exports = router;

