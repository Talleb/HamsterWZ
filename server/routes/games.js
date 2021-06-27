const {Router} = require('express');
const {db} = require('../firebase');

let router = new Router();

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
            timeStamp: new Date(),
            players: [req.body.player1, req.body.player2],
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