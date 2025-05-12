const express = require("express");
const router = express.Router();
const query = require("../mysql");

//req.body req.params req.query
router.get('', async (req, res) => {
  const result = await query("books","selectList",req.body);
  res.send(result);
}); 

router.post("", async (req, res) => { 
  console.log("POST 요청 데이터:", req.body);
  const result = await query("books","InsertInfo",[req.body.author,req.body.description,req.body.image_url,req.body.isbn,req.body.publisher,req.body.title]);
  res.send(result); 
});

router.get("/id/:id", async (req, res) => { 
  const result = await query("books","selectById",req.params.id);
  res.send(result); 
});

router.get("/title/:title", async (req, res) => { 
  // LIKE 검색을 위해 와일드카드 추가->%->기억필수!!
  const searchTerm = `%${req.params.title}%`;
  const result = await query("books","selectByTitle",searchTerm);
  res.send(result); 
});

router.get("/author/:author", async (req, res) => {
  const searchTerm = `%${req.params.author}%`;
  const result = await query("books","selectByAuthor",searchTerm);
  res.send(result); 
});

router.get("/publisher/:publisher", async (req, res) => {
  const searchTerm = `%${req.params.publisher}%`;
  const result = await query("books","selectByPublisher",searchTerm);
  res.send(result); 
});

router.get("/isbn/:isbn", async (req, res) => {
  const searchTerm = `%${req.params.isbn}%`;
  const result = await query("books","selectByIsbn",searchTerm);
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