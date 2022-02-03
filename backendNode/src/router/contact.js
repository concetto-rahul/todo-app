const express = require("express");
const router = express.Router();

const { createValidator, updateValidator } = require("../validator/contact");
const {
  create,
  update,
  deleteById,
  getAll,
  getById,
} = require("../controller/contact");

router.get("/", getAll);
router.post("/", createValidator, create);
router.put("/", updateValidator, update);
router.delete("/:id", deleteById);
router.get("/:id", getById);

module.exports = router;
