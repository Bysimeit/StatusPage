const router = require('express').Router();
const UserRouter = require('./user');
const ClientRouter = require('./client');

router.use("/user", UserRouter);
router.use("/client", ClientRouter);

module.exports = router;