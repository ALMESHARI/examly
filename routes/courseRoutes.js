const express = require('express')
const router = express.Router()

// route login
router.get('/course', (req, res) => {
        res.render('main', { user: 'quest', departments: departments, page:'course'})
        console.log(id)
})


module.exports = router