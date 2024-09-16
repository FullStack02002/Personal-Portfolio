import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createSoftware, deleteSoftware,getAllApplication } from "../controllers/softwareApplication.controller.js";


const router=Router();

router.route("/create").post(verifyJWT,upload.fields([
    {
        name:"svg",
        maxCount:1
    }
]),createSoftware)

router.route("/delete/:id").delete(verifyJWT,deleteSoftware)
router.route("/getall").get(getAllApplication)

export default router;

