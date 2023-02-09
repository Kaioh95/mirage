const router = require("express").Router();

const UserController = require("../controllers/UserController");

const verifyToken = require("../helpers/check-token");
const { imageUpload } = require("../helpers/image-upload");

router.get("/", UserController.bemVindo);
router.get("/user/:id", verifyToken, UserController.verUserPrivate);
router.post("/auth/register", UserController.register);
router.post("/auth/login", UserController.login);
router.get("/select/:id", UserController.getUserById);
router.get("/allusers", UserController.getAllUsers);
router.get("/checkuser", UserController.checkUser);
router.patch(
    "/edituser",
    verifyToken,
    imageUpload.single("image"),
    UserController.editUserNameImg
);
router.delete("/deleteuser/:id", verifyToken, UserController.deleteUser);

module.exports = router;