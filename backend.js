require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()
const port = 4000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (_, res) => {
  res.render('pages/home')
})

app.get('/about', (_, res) => {
  res.render('pages/about')
})

app.get('/detail/:uid', (_, res) => {
  res.render('pages/detail')
})

app.get('/collections', (_, res) => {
  res.render('pages/collections')
})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
)
