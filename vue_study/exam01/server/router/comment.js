const express = require("express");
const router = express.Router();
const query = require("../database/mapper")

router.get('/:bno', async (req,res)=>{
  const result = await query("t_comment_board","selectcmList",req.params.bno);
  res.send(result);
});

router.get('/:bno/count', async (req, res) => {
  const result = await query("t_comment_board", "countcmList", req.params.bno);
  const count = result[0]["count(*)"] || 0;
  res.send({ count: count });
});

module.exports = router;