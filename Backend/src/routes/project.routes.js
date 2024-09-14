import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createProject,deleteProject, getAllProjects, getProjectById, updateProject } from "../controllers/project.controller.js";

const router=Router();

router.route("/create").post(verifyJWT,upload.fields([{
    name:"projectBanner",
    maxCount:1
}]),createProject)

router.route("/delete/:id").delete(verifyJWT,deleteProject)
router.route("/getall").get(getAllProjects)
router.route("/get/:id").get(getProjectById)
router.route("/update/:id").patch(verifyJWT,upload.fields([
    {
        name:"projectBanner",
        maxCount:1
    }
]),updateProject);


export default router