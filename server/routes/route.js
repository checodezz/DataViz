import express from "express"
import { userSigUp } from "../controllers/userController.js"
const router = express.Router();

router.post("/user/signup", userSigUp);

export default router