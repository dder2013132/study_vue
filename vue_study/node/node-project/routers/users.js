const express = require("express");
const router = express.Router();

//logi ninfo
router.get("/info", (req, res) => {
  res.send({ email: req.session.email });
}
)

router.post("/login", (req, res) => {
  const { email, pw } = req.query
  req.session.email = email;
  req.session.pw = pw;
  req.session.save(err => {
    if (err) throw err;
    res.send({code:"success"});
  });
})
router.get("/logout", (req, res) => {
  req.session.destory();
  res.send({code:"logout success"});
})

module.exports = router;