const express = require("express");
const router = express.Router();

router.get("/", (req, res) => { res.send("product 전체 조회"); });
router.post("/", (req, res) => { res.send("product insert"); });

router.get("/:id", (req, res) => { res.send("product 단건 조회"); });
router.put("/:id", (req, res) => { res.send("product update"); });
router.delete("/:id", (req, res) => { res.send("product delete"); });

module.exports = router;