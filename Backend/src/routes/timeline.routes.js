import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTimeline, deleteTimeline, getAllTimeline } from "../controllers/timeline.controller.js";



const router=Router();


router.route("/create").post(verifyJWT,createTimeline);
router.route("/delete/:timelineId").delete(verifyJWT,deleteTimeline)
router.route("/getall").get(getAllTimeline);







export default router;