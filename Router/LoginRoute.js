const express = require('express')
const router  = express.Router()
const shopContoller = require('../Controller/Shop-Controller/shop-control')

router.get('/', shopContoller.shopRender)
router.get('/signup', shopContoller.signUpPage)
router.post('/createUser', shopContoller.signUsersUp)
router.post('/sendEmail', shopContoller.sendEmailContent)
router.get('/verifyOTP', shopContoller.verifyOTP )
router.get('/mainPage', shopContoller.mainPageRenderer)
router.post('/mainPage', shopContoller.postOTPPage)


module.exports = router