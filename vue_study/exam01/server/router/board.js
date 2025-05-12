const express = require("express");
const router = express.Router();
const query = require("../database/mapper")

router.get("", async (req,res)=>{
  const result = await query("t_board_board","selectbdList",req.body);
  res.send(result);
});
router.get("/:no", async (req,res)=>{
  const result = await query("t_board_board","selectbdListByNo",req.params.no);
  res.send(result);
});
router.post("", async (req,res)=>{
  const result = await query("t_board_board","insertInfo",[req.body.title,req.body.writer,req.body.content]);
  res.send(result);
});
router.put("/:no", async (req,res)=>{
  const result = await query("t_board_board","updateInfo",[req.body,req.params.no]);
  res.send(result);
});
router.delete("/:no", async (req,res)=>{
  const result = await query("t_board_board","deleteInfo",req.params.no);
  res.send(result);
});

module.exports = router;