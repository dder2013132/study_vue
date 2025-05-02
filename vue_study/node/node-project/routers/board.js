const express = require("express");
const router = express.Router();
const query = require("../mysql");

//req.body req.params req.query
router.get('', async (req, res) => {
  const result = await query("board","bdselectList",req.body);
  res.send(result);
}); 
router.post("", async (req, res) => { 
  const result = await query("board","bdInsertInfo",[req.body.title,req.body.writer,req.body.content]);
  res.send(result); 
});

router.get("/:id", async (req, res) => { 
  const result = await query("board","bdselectById",req.params.id);
  res.send(result); 
});

router.put("/:id", async (req, res) => {
  const result = await query("board","bdUpdateInfo",[req.body,req.params.id]);
  res.send(result); 
});

router.delete("/:id", async (req, res) => {
  const result = await query("board","bdDeleteInfo",req.params.id);
  res.send(result); 
});

module.exports = router;