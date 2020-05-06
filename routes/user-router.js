const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Collection = require('../models/collections')

// Create user
router.post('/', async (req, res) =>{
    const user = new User({
        userName: req.body.userName,
        email: 'default@email.com'
    })

    await user.save( (err, userSaved) => {
        if (err) res.status(400).json({ message: err.message })        
        res.status(201).json({ userSaved })
        // Automatically create a collection with new user ID
        const collection = new Collection ({
            userId: userSaved._id,
            gameList: []
        })
        collection.save()
    })
})

module.exports = router
