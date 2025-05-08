const express = require("express");
const router = express.Router();
const query = require("../mysql");

//req.body req.params req.query
router.get('', async (req, res) => {
  const result = await query("books","selectList",req.body);
  res.send(result);
}); 
router.post("", async (req, res) => { 
  const result = await query("books","InsertInfo",[req.body.author,req.body.description,null,req.body.image_url,req.body.isbn,req.body.publisher,req.body.title]);
  res.send(result); 
});

router.get("/:id", async (req, res) => { 
  const result = await query("books","selectByTitle",req.params.id);
  res.send(result); 
});

router.get("/:title", async (req, res) => { 
  const result = await query("books","selectByTitle",req.params.title);
  res.send(result); 
});

router.get("/:author", async (req, res) => { 
  const result = await query("books","selectByAuthor",req.params.author);
  res.send(result); 
});

router.get("/:publisher", async (req, res) => { 
  const result = await query("books","selectByPublisher",req.params.publisher);
  res.send(result); 
});

router.get("/:isbn", async (req, res) => { 
  const result = await query("books","selectByIsbn",req.params.isbn);
  res.send(result); 
});

router.put("/:id", async (req, res) => {
  const result = await query("books","UpdateInfo",[req.body,req.params.id]);
  res.send(result); 
});

router.delete("/:id", async (req, res) => {
  const result = await query("books","DeleteInfo",req.params.id);
  res.send(result); 
});

module.exports = router;