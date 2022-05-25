var express = require("express");
const AuthController = require("../controllers/AuthController");
const AdminController = require("../controllers/AdminController");

const {CheckAdmin}=require('../middlewares/admin')
var router = express.Router();
router.get("/users",CheckAdmin ,AdminController.GetCandidates);
router.get("/companies",CheckAdmin, AdminController.GetCompanies);
router.get("/offers",CheckAdmin, AdminController.GetJobs)
router.post("/category",CheckAdmin,AdminController.addCat)
router.get("/getallCat",CheckAdmin,AdminController.getAllCat)
router.delete("/deleteCat/:id",CheckAdmin,AdminController.deleteCat)
router.put("/updateCat/:id",CheckAdmin,AdminController.updateCat);
router.get("/catById/:id",CheckAdmin,AdminController.getCatById)


router.post("/login", AuthController.login);



module.exports = router;