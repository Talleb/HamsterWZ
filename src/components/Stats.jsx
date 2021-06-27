import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Profile from './Profile'
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});


export const LastGame = ({showWinner}) => {
    const { id1, id2 } = useParams();
    const specific = id1 === undefined ? false : true
    const url = specific === true ? `http://localhost:3000/games/${id1}/${id2}` : 'http://localhost:3000/games/last';
    const [lastGameData, setLastGameData] = useState(null);
    const classes = useStyles();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();
            setLastGameData({ games: json });
    
        }
        fetchData();
    }, [url])

const time = lastGameData?.games[0]?.timeStamp;
const player1 = lastGameData?.games[0]?.player1?.name;
const player2 = lastGameData?.games[0]?.player2?.name;
const winner = lastGameData?.games[0]?.winner;

return (
    <>
    <h1>Last Game</h1>
    <div>
        
    {time ? 
    <>
    <p>
    {time}: {player1} vs {player2} --- Winner: {winner?.name}
    </p>
    <div>
    {showWinner ? <Profile Hamster={winner}/> : ''}
    </div>
    </>
    : 'Cant find that specific matchup'}
    </div>
    </>
)
}


export const LatestGames = () => {
    const url = 'http://localhost:3000/games';
    const [gamesData, setGamesData] = useState(null);
    const classes = useStyles();
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();
            setGamesData({ games: json });
    
        }
        fetchData();
    }, [])

    return (
        <div className="LatestGame"> {gamesData ? <TableContainer component={Paper}>
            <h1>Totalt spelade matcher: {gamesData.games.length}</h1>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Hamster 1</TableCell>
                        <TableCell align="right">Hamster 2</TableCell>
                        <TableCell align="right">Winner</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gamesData.games.map((row) => (
                        <TableRow key={row.timeStamp._seconds} >
                            <TableCell component="th" scope="row" >
                                {row.timeStamp} 
                            </TableCell>
                            <TableCell align="right">{row.player1.name}</TableCell>
                            <TableCell align="right">{row.player2.name}</TableCell>
                            <TableCell align="right">{row.winner.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : 'no data'}
        </div>
    );
}

export const LeaderBoard = () => {
    const url = 'http://localhost:3000/charts/top';
    const [data, setData] = useState(null);
    const classes = useStyles();
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();
            setData({ LeaderBoard: json });
        }
        fetchData();
    }, [])

    return (
        <div> {data ? <TableContainer component={Paper}>
            <h1>Leaderboard</h1>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow >
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Games</TableCell>
                        <TableCell align="right">Wins</TableCell>
                        <TableCell align="right">Losses</TableCell>
                        <TableCell align="right">Winrate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.LeaderBoard.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.games}</TableCell>
                            <TableCell align="right">{row.wins}</TableCell>
                            <TableCell align="right">{row.defeats}</TableCell>
                            <TableCell align="right">{isNaN(Math.floor(row.wins / row.games * 100)) ? 0 : Math.floor(row.wins / row.games * 100) }%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : 'no data'}
        <div>
            <LastGame/>
            <LatestGames/>
        </div>
        </div>
    );
}

export const LoserBoard = () => {
    const url = 'http://localhost:3000/charts/bottom';
    const [data, setData] = useState(null);
    const classes = useStyles();
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();
            setData({ LeaderBoard: json });
        }
        fetchData();
    }, [])

    return (
        <div> {data ? <TableContainer component={Paper}>
            <h1>Loserboard</h1>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow >
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Games</TableCell>
                        <TableCell align="right">Wins</TableCell>
                        <TableCell align="right">Losses</TableCell>
                        <TableCell align="right">Winrate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.LeaderBoard.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.games}</TableCell>
                            <TableCell align="right">{row.wins}</TableCell>
                            <TableCell align="right">{row.defeats}</TableCell>
                            <TableCell align="right">{isNaN(Math.floor(row.wins / row.games * 100)) ? 0 : Math.floor(row.wins / row.games * 100) }%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : 'no data'}
        </div>
    );
}