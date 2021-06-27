const {Router} = require('express');
const {db} = require('../firebase');

let router = new Router();

router.get('/', async (req, res) => {
    try {
        let hamsters = [];
        let snapShot = await db.collection('hamsters').get();
        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })
        res.status(200).send(hamsters)
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

router.get('/random', async (req, res) => {
    try {
        let hamsters = [];
        let snapShot = await db.collection('hamsters').get();
        snapShot.forEach(doc => {
            hamsters.push(doc.data());
        })
        res.status(200).send(hamsters[Math.floor(Math.random() * hamsters.length)])
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

router.put('/:id/result', async (req, res) => {
    try {
        let docId;
        let newResults;
        let snapShot = await db.collection('hamsters')
            .where("id", "==", parseInt(req.params.id)).get();
        snapShot.forEach(async doc => {
            let results = doc.data()
            docId = doc.id
            newResults = {
                wins: results.wins + req.body.wins,
                defeats: results.defeats + req.body.defeats,
                games: results.games + req.body.games
            }
           await db.collection('hamsters').doc(docId).update(newResults)
        })
        res.status(200).send({newResults})
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        let snapShot = await db.collection('hamsters')
            .where("id", "==", parseInt(req.params.id)).get();
        snapShot.forEach(doc => {
            res.status(200).send(doc.data());
        })
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})



module.exports = router;