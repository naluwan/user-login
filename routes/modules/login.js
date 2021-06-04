const express = require('express')
const router = express.Router()
const User = require('../../models/user')
let isLogin = false

router.post('/login', (req, res) => {
  isLogin = false
  const { inputAccount, inputPassword } = req.body
  if (!inputAccount || !inputPassword) {
    const inputEmpty = 'Please enter Account and Password!'
    res.render('index', { inputEmpty, inputAccount })
    return
  }

  User.findOne({ email: inputAccount })
    .lean()
    .then(user => {
      if (!user) {
        const noResult = 'Account does not exist! Please try again!'
        res.render('index', { noResult, inputAccount })
        return
      }
      if (user.password !== inputPassword) {
        const noResult = 'Wrong Password! Please try again!'
        res.render('index', { noResult, inputAccount })
        return
      }
      isLogin = true
      res.cookie('userName', user.firstName, { signed: true, maxAge: 60000 })
      res.cookie('userEmail', user.email, { signed: true, maxAge: 60000 })
      res.render('welcome', { name: user.firstName, isLogin })
    }).catch(error => console.log(error))
})

router.get('/loginout', (req, res) => {
  res.clearCookie('userName')
  res.clearCookie('userEmail')

  return res.redirect('/')
})

module.exports = router