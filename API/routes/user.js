const UserController = require("../controllers/userCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/', JWTMiddleWare.identification, UserController.verifyToken);
router.post('/', UserController.login);


module.exports = router;