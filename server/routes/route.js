import express from "express"
import { userSigUp, userLogin, userDashboard} from "../controllers/userController.js"
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/user/signup", userSigUp);
router.post("/user/login",userLogin);
router.get("/dashboard", auth, userDashboard)

export default router