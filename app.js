const express = require('express')
const app = express()
const port = 3000
const hbs = require('express-handlebars')

app.engine('hbs', hbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')



app.get('/', (req, res) => {
  res.render('index')
})





app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})