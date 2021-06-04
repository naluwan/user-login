const express = require('express')
const app = express()
const port = 3000
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
const User = require('./models/user')

app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

require('./config/mongoose')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', (req, res) => {
  const { inputAccount, inputPassword } = req.body
  if (!inputAccount || !inputPassword) {
    const inputEmpty = 'Please enter Account and Password!'
    res.render('index', { inputEmpty })
    return
  }

  User.findOne({ email: inputAccount })
    .lean()
    .then(user => {
      if (!user) {
        const noResult = 'Account does not exist! Please try again!'
        res.render('index', { noResult })
        return
      }
      if (user.password !== inputPassword) {
        const noResult = 'Wrong Password! Please try again!'
        res.render('index', { noResult })
        return
      }
      res.render('welcome', { name: user.firstName })
    }).catch(error => console.log(error))
})




app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})