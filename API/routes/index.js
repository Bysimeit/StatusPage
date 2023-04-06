const router = require('express').Router();
const UserRouter = require('./user');
const ClientRouter = require('./client');
const ServiceRouter = require('./service');

router.use("/user", UserRouter);
router.use("/client", ClientRouter);
router.use("/service", ServiceRouter);

module.exports = router;