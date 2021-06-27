const express = require('express');
const app = express();
const cors = require ('cors');
const serverPort = process.env.PORT || 2048; 

app.use(cors());
app.use(express.json());



app.use(express.static(__dirname + '/../build'));

app.use('/assets', express.static(__dirname + '/hamsters'));




const hamstersRoute = require('./routes/hamsters.js');
const chartsRoute = require('./routes/charts.js');
const gamesRoute = require('./routes/games.js');
const statsRoute = require('./routes/stats.js');


app.use('/api/hamsters', hamstersRoute);
app.use('/api/charts', chartsRoute);
app.use('/api/games', gamesRoute);
app.use('/api/stats', statsRoute);




app.listen(serverPort, () => console.log('Server is listening on port ' + serverPort));

