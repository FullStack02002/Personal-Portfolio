import {Router} from  "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createMessage,deleteMessage,getAllMessage } from "../controllers/message.controller.js";
const router=Router();



router.route("/create").post(createMessage);
router.route("/delete/:id").delete(verifyJWT,deleteMessage);
router.route("/getall").get(verifyJWT,getAllMessage);


export default router;