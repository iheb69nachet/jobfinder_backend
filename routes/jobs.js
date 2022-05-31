var express = require("express");
const JobsController = require("../controllers/JobController");

const { CheckAdmin, CheckCompany } = require('../middlewares/admin')
const multer = require("multer");
const authenticateJWT = require("../middlewares/authenticateJWT");
var storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, './cvs')
    },
    filename: function (req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+'.'+file.mimetype.split('/').reverse()[0]);
    },
});


var router = express.Router();

router.post("/add",CheckCompany ,JobsController.AddNew);
router.get("/list",CheckCompany ,JobsController.GetJobs);
router.get("/approve",CheckAdmin ,JobsController.ApproveJob);
router.get("/dispprove",CheckAdmin ,JobsController.DisapproveJob);
router.get("/detail",JobsController.getJobById);
router.put("/updatejob/:id",CheckCompany,JobsController.update);
router.put("/updatejobAd/:id",CheckAdmin,JobsController.update);
router.delete("/deletejob/:id",CheckCompany,JobsController.delete);
router.delete("/deletejobAd/:id",CheckAdmin,JobsController.delete);
router.get("/approveApp",CheckCompany,JobsController.ApproveApp)
router.get("/dispproveApp",CheckCompany ,JobsController.DisapproveApp);
router.get("/applications",CheckAdmin,CheckCompany,JobsController.GetApps)


router.get("/approved" ,JobsController.Approved);
router.post("/apply" , [multer({storage: storage}).single('cv'),authenticateJWT],JobsController.Apply);
router.get("/applies" ,CheckCompany,JobsController.GetApplies);
router.post("/comment" ,authenticateJWT,JobsController.comment);
router.get("/comments",authenticateJWT,JobsController.GetComments)
router.post("/comment/actions" ,authenticateJWT,JobsController.Actioncomment);
router.get("/comment/delete" ,authenticateJWT,JobsController.DeleteComment);
router.post("/favorites" ,authenticateJWT,JobsController.favorites);
router.post("/favorites/delete" ,authenticateJWT,JobsController.Deletefavorites);

router.get("/favorites" ,authenticateJWT,JobsController.Getfavorites);










module.exports = router;