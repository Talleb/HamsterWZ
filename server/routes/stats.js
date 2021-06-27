const {Router} = require('express');
const {db} = require('../firebase');

let router = new Router();

router.get('/total', async (req, res) => {
    try {
        let games = [];
        let snapShot = await db.collection('games').get();
        snapShot.forEach(doc => {
            games.push(doc.data());
        })
        res.status(200).send({ totalGames: games.length})
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

router.get('/:favFood', async (req, res) => {
    try {
        let favorite = [];
        let snapShot = await db.collection('hamsters')
            .where("favFood", "==", req.params.favFood).get();
        snapShot.forEach(doc => {
            favorite.push(doc.data());
        })
        res.status(200).send({Food: req.params.favFood, antal: favorite.length});
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

module.exports = router;