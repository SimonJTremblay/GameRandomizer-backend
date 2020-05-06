const express = require('express')
const router = express.Router()
const Collection = require('../models/collections')

// Get game collection for active user
router.get('/:id', getCollection, (req, res) => {
    res.json(res.collection);
})

// Append game to user Collection gameList
router.post('/:id', getCollection, async (req, res) => {
    const game = buildGameObject(req);
    
    // Append game to gameList
    let coll = res.collection;
    coll.gameList.push(game);

    try {
        const updated = await coll.save()
        console.log(`update: ${updated}`)
        res.status(201).json(updated)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// method that returns the collection of a given user
async function getCollection(req, res, next) {
    try {
        collection = await Collection.findOne({userId: req.params.id})
        if(collection == null){
            return res.status(404).json({ message: `Can't find collection. Sorry.` })
        }
    } catch (error) {
        return res.status(500).json({ message:error.message })
    }

    res.collection = collection;
    next();
}

function buildGameObject(req){
    let cat = [];
    let mech = [];
    let expan = [];
    //loop over link
    for(let link of req.body.items.item.link){
        if(link._attributes.type === "boardgamecategory"){
            cat.push({
                id: link._attributes.id,
                value: link._attributes.value,
            })
        }
        else if(link._attributes.type === "boardgamemechanic"){
            mech.push({
                id: link._attributes.id,
                value: link._attributes.value,
            })
        }
        else if(link._attributes.type === "boardgameexpansion"){
            expan.push({
                id: link._attributes.id,
                value: link._attributes.value,
            })
        }
    }
    const obj = req.body.items.item;
    const game = {
        bggId:  obj._attributes.id,
        title:  Array.isArray(obj.name)? obj.name[0]._attributes.value: obj.name._attributes.value ,
        yearPublished: obj.yearpublished._attributes.value ,
        media:{
            thumbnail: obj.thumbnail ? obj.thumbnail._text : null,
            image: obj.image ? obj.image._text : null,
        },
        players:{
            min: obj.minplayers._attributes.value,
            max: obj.maxplayers._attributes.value
        },
        playtime:{
            min: obj.minplaytime._attributes.value,
            max: obj.maxplaytime._attributes.value,
        },
        categories: cat,
        mechanics:  mech,
        expansions: expan,
    }

    return game;
}
module.exports = router