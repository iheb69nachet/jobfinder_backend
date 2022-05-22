var express = require("express");
const JobsController = require("../controllers/JobController");

const { CheckAdmin, CheckCompany } = require('../middlewares/admin')

var router = express.Router();

router.post("/add",CheckCompany ,JobsController.AddNew);
router.get("/list",CheckCompany ,JobsController.GetJobs);
router.get("/approve",CheckAdmin ,JobsController.ApproveJob);
router.get("/dispprove",CheckAdmin ,JobsController.DisapproveJob);

router.get("/approved" ,JobsController.Approved);






module.exports = router;