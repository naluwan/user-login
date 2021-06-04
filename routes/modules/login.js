const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.post('/', (req, res) => {
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
      res.render('welcome', { name: user.firstName })
    }).catch(error => console.log(error))
})

module.exports = router