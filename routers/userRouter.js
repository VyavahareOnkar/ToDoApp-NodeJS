import express from "express";
import { register, login, logout, getMyProfile} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// The actual endpoint/route is /users/all but we have added the /users in the while registering the middleware to set it as default
// router.get("/all",getAllUsers);

router.post("/new", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", logout);
// router.post("/update/:id",isAuthenticated, updateUser);


// if the path/endpoint is same for the different requests like get/put/delete then instead of mentioning the path repeatedly we can use above method 
// router.get("userid/:id",getUserDetails);
// router.put("userid/:id",updateUser);
// router.delete("userid/:id",deleteUser);

export default router;

