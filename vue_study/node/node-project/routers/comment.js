const express = require("express");
const router = express.Router();
const query = require("../mysql");

//req.body req.params req.query
router.get('', async (req, res) => {
  const result = await query("comment","cmselectList",req.body);
  res.send(result);
}); 
router.post("", async (req, res) => { 
  const result = await query("comment","cmInsertInfo",[req.body.writer,req.body.content,req.body.bid]);
  res.send(result); 
});

router.get("/:id", async (req, res) => { 
  const result = await query("comment","cmselectById",req.params.id);
  res.send(result); 
});

router.put("/:id", async (req, res) => {
  const result = await query("comment","cmUpdateInfo",[req.body,req.params.id]);
  res.send(result); 
});

router.delete("/:id", async (req, res) => {
  const result = await query("comment","cmDeleteInfo",req.params.id);
  res.send(result); 
});

module.exports = router;