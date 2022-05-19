var express = require("express");
const AuthController = require("../controllers/AuthController");

var router = express.Router();

router.post("/register", AuthController.register);
router.post("/registerCompany", AuthController.registerCompany);
router.post("/login", AuthController.login);



module.exports = router;