import { Router } from "express";

import {
  changeName,
  changePassword,
  changeUsername,
  userLogin,
  userLogOut,
  userProfile,
  userRegister,
} from "../controllers/user.controller.js";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  userRegister
);

router.route("/login").post(userLogin);

// secured routes

router.route("/logout").post(verifyJwt, userLogOut);

router.route("/profile").get(verifyJwt, userProfile);

router.route("/change-password").patch(verifyJwt, changePassword);

router.route("/change-username").patch(verifyJwt, changeUsername);

router.route("/change-name").patch(verifyJwt, changeName);
export default router;
