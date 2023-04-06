const AuthoMiddleware = require("../middleware/authorization");
const ServiceController = require("../controllers/serviceCtrl");
const JWTMiddleWare = require("../middleware/identification");

const Router = require("express-promise-router");
const router = new Router;

router.get('/', ServiceController.getListService);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ServiceController.postNewService);
router.patch('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ServiceController.updateService);
router.delete('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, ServiceController.deleteService);

module.exports = router;