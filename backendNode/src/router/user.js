const express = require("express");
const router = express.Router();

const { login, profile, refreshToken } = require("../controller/user");
const { checkToken } = require("../middleware/tokenAuth");
const { loginValidator } = require("../validator/user");

router.post("/login", loginValidator, login);
router.get("/profile", checkToken, profile);
router.get("/refresh_token", checkToken, refreshToken);

module.exports = router;

// var multer = require("multer");
// var upload = multer({ dest: "uploads/" });
// upload.single('uploaded_file')
