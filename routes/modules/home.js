const express = require('express')
const router = express.Router()
let isLogin = false

router.get('/', (req, res) => {

  isLogin = false
  if (req.signedCookies.userName && req.signedCookies.userEmail) {
    isLogin = true
    return res.render('welcome', { userName: req.signedCookies.userName, isLogin })

  }

  res.render('index')
})

module.exports = router