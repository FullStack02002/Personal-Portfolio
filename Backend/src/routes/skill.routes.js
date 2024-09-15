import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createSkill, deleteSkill, getAllSkills, updateSkill } from "../controllers/skill.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router();

router.route("/create").post(verifyJWT,upload.fields([
    {
        name:"svg",
        maxCount:1
    }
]),createSkill)


router.route("/delete/:id").delete(verifyJWT,deleteSkill)
router.route("/getall").get(getAllSkills);
router.route("/update/:id").patch(verifyJWT,updateSkill);




export default router;