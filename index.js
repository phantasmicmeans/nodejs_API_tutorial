const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const app = express()
let users = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bek'},
  {id: 3, name: 'Chris'}
]
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//유저 전체 get
app.get('/users', (req,res) => {

  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10)
  console.log("limit:", limit)
  if (Number.isNaN(limit)){
    res.status(400).end()
  }
  else {
    res.json(users.slice(0, limit));
  }
})

//유저 get
app.get('/users/:id', (req,res) =>{

  const id  = parseInt(req.params.id, 10)
  if (Number.isNaN(id))
  {
    return res.status(400).end()
  }
  const user = users.filter(user => user.id === id)[0]

  if (!user){
    return res.status(404).end()
  }

  res.json(user)
})

//유저 삭제
app.delete('/users/:id', (req,res) => {

  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id))
  {
    return res.status(400).end()

  }
  users = users.filter (user => user.id !== id)
  res.status(204).end()

})

app.post('/users', (req,res) => {

  const name = req.body.name //request의 body에서 name추출
  if (!name)
  {
    return res.status(400).end()
  }

  const found = users.filter(user => user.name === name).length
  //users의 name중 위에서 받아온 name과 같은게 있다면 길이가 1
  if(found) {
    return res.status(409).end()
  }

  const id = Date.now()
  const user = {id, name}
  users.push(user)
  res.status(201).json(user)
})













app.listen(3000, () => console.log("Running"))
module.exports = app
