import express from 'express'
//const User = require('./models/User')//one or two dotes??
import User from './models/User.js'
const router = express.Router()

//login user
router.get('/signin-popup', (req,res)=>{
    res.render('components/signin-popup')
} )

//signin post request : (i don't think we need it bcz its already will go to next popup)
router.post('/signin-popup', (req,res)=>{
    console.log(req.body)
    req.json('login in user..')
})

//signup user
router.get('/signup-popup', (req,res)=>{
    res.render('components/signup-popup')
} )

//sign up popup:(i don't think we need it bcz its already will go to next popup)
router.post('/signup-popup', (req,res)=>{
    console.log(req.body)
    req.json('register in user..')
})


// //profile: if user have login/register corecctlly:
// router.get('/profile', (req,res)=>{
//     res.render('user/profile')
// } )

//logout
router.get('/logout', (req,res)=>{
    res.render('logout user')
} )


// module.exports = router
export default router