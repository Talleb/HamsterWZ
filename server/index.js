const express = require('express');
const app = express();
const cors = require ('cors');
const serverPort = process.env.PORT || 2048; 
const path = require('path');

app.use(cors());
app.use(express.json());



app.use(express.static(__dirname + '/../build'));
app.use('/hamsters', express.static(__dirname + '/hamsters'));




const hamstersRoute = require('./routes/hamsters.js');
const chartsRoute = require('./routes/charts.js');
const gamesRoute = require('./routes/games.js');
const statsRoute = require('./routes/stats.js');


app.use('/api/hamsters', hamstersRoute);
app.use('/api/charts', chartsRoute);
app.use('/api/games', gamesRoute);
app.use('/api/stats', statsRoute);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../build/index.html'), 
    function (err) {        
        if (err) {            
            res.status(500).send(err)       
        }
        })
    })




app.listen(serverPort, () => console.log('Server is listening on port ' + serverPort));

