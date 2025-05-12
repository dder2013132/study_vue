const express = require('express');

require("dotenv").config({path: "./database/mysql.env"});

const app = express();
const port = 3000;
const url = `http://localhost:${port}`;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/board', require('./router/board'));
app.use('/comment', require('./router/comment'));

app.listen(port, () => {
  console.log(`${url} 에서 서버가 실행됨`);
});