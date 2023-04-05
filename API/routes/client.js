const AuthoMiddleware = require("../middleware/authorization");
const ClientController = require("../controllers/clientCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin ,ClientController.getAllUser);
router.get('/:email', JWTMiddleWare.identification ,ClientController.getUser);
router.post('/', ClientController.postNewUser);
router.patch('/', JWTMiddleWare.identification, ClientController.updatePasswordEmailUser);
router.delete('/', JWTMiddleWare.identification, ClientController.deleteUser);

module.exports = router;