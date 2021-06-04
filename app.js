const express = require('express')
const app = express()
const port = 3000
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const User = require('./models/user')
const routes = require('./routes')
const cookieParser = require('cookie-parser')

app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

require('./config/mongoose')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(cookieParser('naluwan'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})