const express = require('express')
const router = express.Router()
const Collection = require('../models/collections')

// Get game collection for active user
router.get('/', async (req, res) => {
    try {
        const gameCollection = await Collection.find()
        res.json(gameCollection)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Append to user Collection
router.post('/', async (req, res) => {
    // const child = new Child({
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     dateOfBirth: req.body.dateOfBirth
    // })

    // try {
    //     const newChild = await child.save()
    //     res.status(201).json(newChild)
    // } catch (error) {
    //     res.status(400).json({ message: error.message })
    // }
})

module.exports = router