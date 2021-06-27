const express = require('express');
const app = express();
const serverPort = process.env.PORT || 2048; 
app.use(express.json());

app.use('/', express.static('public'))
app.use('/assets', express.static('hamsters'))

// Använd static middleware för att serva de byggda frontend-app-filerna
// Det kan se annorlunda ut om man använder express-router.
app.use(express.static(__dirname + '/../build'));

app.use('/assets', express.static(__dirname + '/hamsters'));




const hamstersRoute = require('./routes/hamsters.js');
const chartsRoute = require('./routes/charts.js');
const gamesRoute = require('./routes/games.js');
const statsRoute = require('./routes/stats.js');


app.use('/hamsters', hamstersRoute);
app.use('/charts', chartsRoute);
app.use('/games', gamesRoute);
app.use('/stats', statsRoute);




app.listen(serverPort, () => console.log('Server is listening on port ' + serverPort));

