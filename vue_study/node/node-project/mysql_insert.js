// mysql 모듈 로드
const pool = require("./mysql")
// mysql 접속 정보
const conn = {
  connectionLimit : 10,
  host: "127.0.0.1",
  port: "3306",
  user: "hr",
  password: "a1a2a3A4@@",
  database: "shop"
};
// DB 커넥션 생성
let pool = mysql.createPool(conn);
// 2. SQL 실행
const data ={name:"황보길동", email:"d@d.d","phone":"010-2222-0000"};
sql = "insert customers (name,email,phone) values(?,?,?)";
pool.query(sql,[data.name,data.email,data.phone],function (err,results,fields){
  if(err) {
    console.log(err);
  }
  // 3. 결과 처리
  console
    .log
    (results);
})