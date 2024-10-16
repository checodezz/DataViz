import express from "express"
import { userSigUp, userLogin} from "../controllers/userController.js"
import auth from "../middleware/auth.js";
import { getAnalyticsData } from "../controllers/dataController.js";
const router = express.Router();

router.post("/user/signup", userSigUp);
router.post("/user/login",userLogin);
router.get("/dashboard", auth, getAnalyticsData);

export default router