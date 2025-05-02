const express = require("express");
require("dotenv").config({path : "./mysql/.env"});
const { route } = require("./routers/customer");
const cors = require('cors')

const app = express(); // 인스턴스 생성
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
// 라우트 설정
      // 엔드포인트 ("/")
app.get("/", (req,res)=>{
  res.send("hello");
});

app.use("/customer", require("./routers/customer"))
app.use("/board", require("./routers/board"))
app.use("/comment", require("./routers/comment"))

app.listen(port, () => {
  console.log(`http://localhost:${port} 서버 실행됨`); 
});