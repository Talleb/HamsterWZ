const {Router} = require('express');
const {db} = require('../firebase');

let router = new Router();

router.get('/top', async (req, res) => {
    try {
        let hamster = [];
        let snapShot = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get();
        snapShot.forEach(doc => {
            hamster.push(doc.data());
        })
        res.status(200).send(hamster)
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

router.get('/bottom', async (req, res) => {
    try {
        let hamster = [];
        let snapShot = await db.collection('hamsters').orderBy('defeats', 'desc').limit(5).get();
        snapShot.forEach(doc => {
            hamster.push(doc.data());
        })
        res.status(200).send(hamster)
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})





module.exports = router;