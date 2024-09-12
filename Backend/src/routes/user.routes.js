import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateProfile,
  changePassword,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured Routes

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-profile").patch(
  verifyJWT,
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  updateProfile
);
router.route("/change-password").post(verifyJWT,changePassword);

export default router;
