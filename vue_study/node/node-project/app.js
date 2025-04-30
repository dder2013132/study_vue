const express = require('express')
const app = express()
const port = 3000

let data = [
    {
      "id": "4",
      "first_name": "길동",
      "last_name": "Loton",
      "email": "eloton3@dagondesign.com",
      "salary": "$3.38",
      "department_id": 10,
      "job_id": "it"
    },
    {
      "id": "5",
      "first_name": "Emmalee",
      "last_name": "Laboune",
      "email": "elaboune4@salon.com",
      "salary": "$8.40",
      "department_id": 20,
      "job_id": "sales"
    },
    {
      "id": "6",
      "first_name": "Michal",
      "last_name": "Ivanyushkin",
      "email": "mivanyushkin5@hao123.com",
      "salary": "$8.21",
      "department_id": 10,
      "job_id": "it"
    },
    {
      "id": "8",
      "first_name": "Ange",
      "last_name": "Leon",
      "email": "aleon7@ucla.edu",
      "salary": "$0.33",
      "department_id": 10,
      "job_id": "sales"
    },
    {
      "id": "9",
      "first_name": "Odilame",
      "last_name": "Wukuchukwe",
      "job_id": "it"
    },
    {
      "id": "",
      "first_name": "유미",
      "last_name": "김",
      "job_id": "it",
      "department_id": 20,
      "salary": "1000",
      "email": "a@a.a"
    },
    {
      "id": "11",
      "first_name": "aa",
      "last_name": "aa",
      "email": "a@a.a",
      "phone_number": "",
      "hire_date": "",
      "job_id": "it",
      "salary": "11",
      "commission_pct": "",
      "manager_id": "",
      "department_id": 10
    },
    {
      "id": "12",
      "first_name": "bb",
      "last_name": "bb",
      "email": "a@a.a",
      "phone_number": "",
      "hire_date": "",
      "job_id": "it",
      "salary": "11",
      "commission_pct": "",
      "manager_id": "",
      "department_id": 20
    },
    {
      "id": "13",
      "first_name": "3123",
      "last_name": "123",
      "job_id": "sales",
      "salary": "123",
      "email": "123"
    },
    {
      "id": 21,
      "first_name": "last",
      "last_name": "last",
      "job_id": "sales",
      "salary": "123123",
      "email": "123"
    }
  ]

app.get('/', (req, res) => {
  res.send('Hello World! bye!')
})

app.get('/home', (req, res) => {
  res.send('This is A Home!')
})

app.get('/cart', (req, res) => {
  res.send('This is A Cart!')
})

app.get('/emp', (req, res) => {
  res.send(data)
})

// 부서가 10번인 첫번째 사원
app.get('/find', (req, res) => {
  res.send('This is A Cart!')
})

// jobid가 'it'인 사원만 출력
app.get('/filter', (req, res) => {
  res.send('This is A Cart!')
})

// firstname순으로 정렬 출력
app.get('/sort', (req, res) => {
  res.send('This is A Cart!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})