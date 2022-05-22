var express = require("express");
const AuthController = require("../controllers/AuthController");
const AdminController = require("../controllers/AdminController");

const {CheckAdmin}=require('../middlewares/admin')
var router = express.Router();
router.get("/users",CheckAdmin ,AdminController.GetCandidates);
router.get("/companies",CheckAdmin, AdminController.GetCompanies);
router.get("/offers",CheckAdmin, AdminController.GetJobs)

router.post("/login", AuthController.login);



module.exports = router;