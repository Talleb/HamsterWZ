const {Router} = require('express');
const {db} = require('../firebase');

let router = new Router();

router.get('/:id1/:id2', async (req, res) => {
    try {
        let gamesArray = [];
        let gamesDB = await db.collection('games')
            .where('player1.id', "==", parseInt(req.params.id1))
            .where('player2.id', "==", parseInt(req.params.id2))
            .get()
        gamesDB.forEach(game => {
            gamesArray.push(game.data());
        })
        res.status(200).send(gamesArray)
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

router.get('/last', async (req, res) => {
    try {
        let gamesArray = [];
        let gamesDB = await db.collection('games').orderBy('timeStamp', 'desc').limit(1).get();
        gamesDB.forEach(game => {
            gamesArray.push(game.data());
        })
        res.status(200).send(gamesArray)
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

router.get('/', async (req, res) => {
    try {
        let games = [];
        let snapShot = await db.collection('games').get();
        snapShot.forEach(doc => {
            games.push(doc.data());
        })
        res.status(200).send(games)
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

router.post('/', async (req, res) => {
    try {
        let game = {
            timeStamp: new Date().toLocaleString(),
            player1: req.body.player1,
            player2: req.body.player2,
            // players: [req.body.player1, req.body.player2],
            winner: req.body.winner
        }
        await db.collection('games').doc().set(game);
        res.status(200).send("New game registered")
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})


module.exports = router;