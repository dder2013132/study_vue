const express = require('express')

const app = express()
const port = 80

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

let boards = [
  {id:1, title:"야당", content:"야당..."},
  {id:2, title:"터미네이터", content:"미래의..."}
] //id, title, content

//로그 미들웨어 morgan
const morgan = require('morgan')
app.use(morgan(':date[iso] :method :url :remote-addr'))

app.get('/', (req, res) => {
  res.send("hello");
})

//전체조회
app.get('/board', (req, res) => {
  res.send(boards);
})

//등록
app.post('/board', (req, res) => {
  const board = req.body;
  boards.push(board);
  res.send(board);
  console.log("받은 파라미터", board)
})

//수정
app.put('/board/:id', (req,res)=>{
  const id = req.params.id;
  const board = req.body; //json, form-data
  const idx = boards.findIndex( ele => ele.id == id)
  if(idx>=0){
    boards[idx]=board;
    res.send(board)
  } else{
    res.send( "not found");
  }
})

// //삭제
// app.delete('/board/:id', (req,res)=>{
//   const id = req.params.id;
//   const idx = boards.findIndex( ele => ele.id = id)
//   if(idx>=0){
//     boards.splice(idx , 1);
//     res.send(boards);
//   } else{
//     res.send( "not found" );
//   }
// })

// 삭제
app.delete('/board/:id', (req, res) => {
  const id = req.params.id;
  boards = boards.filter(e => e.id != id);
  res.send(boards);
});

let emps = [ {id:1,name:"길동"},{id:2,name:"순신"} ]
//route() 같은 리소스(url) method별로 라우트를 묶어서 지정
app.route("/emp")
   .get((req,res)=>{ res.send(emps) } )
   .get((req,res)=>{ res.send(emps[req.query.id]) } )
   .post((req,res)=>{ res.send(req.body) } )
   .put((req,res)=>{ res.send(req.body) } )
   .delete((req,res)=>{ res.send(req.body.id) } )

app.use("/product",require("./routes/product"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})