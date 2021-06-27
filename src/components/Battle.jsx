import React,{useEffect, useState} from 'react';
import Profile from './Profile'
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Wrapper = withStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: '50px'
    }
  })(Container);

  async function ResolveGame(player1, player2, winner) {
    const match = {
        "player1": player1,
        "player2": player2,
        "winner": winner,
    }
    const ResolvedWinner = player1.id === winner.id ? player1 : player2
    const ResolvedLoser = player1.id === winner.id ? player2 : player1

    console.log('winner', ResolvedWinner)
    console.log('Loser', ResolvedLoser)

    // const url = '/api/games'
    const url = 'http://localhost:3000/games'
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(match)
    })
    updateWinner(ResolvedWinner)
    updateLoser(ResolvedLoser)
    console.log(await response.text())
}

async function updateLoser(loser) {
    const results = {
        "wins": +0,
        "defeats": +1,
        "games": +1
    }
    // const url = `/api/hamsters/${loser.id}/result`
    const url = `http://localhost:3000/hamsters/${loser.id}/result`
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results)
    })
    console.log(await response.text(), 'Loser: ' + loser.name)
}
async function updateWinner(winner) {
    const results = {
        "wins": +1,
        "defeats": +0,
        "games": +1
    }
    // const url = `/api/hamsters/${winner.id}/result`
    const url = `http://localhost:3000/hamsters/${winner.id}/result`
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results)
    })
    console.log(await response.text(), 'Winner: ' + winner.name)
}

const GetHamsterOne = ({hamster1, setHamster1}) => {
    const {id1, id2} = useParams();
    let url = null

    if (id1 === undefined) {
        url = 'http://localhost:3000/hamsters/random'
    } else {
        url = `http://localhost:3000/hamsters/${id1}`
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();

            setHamster1({ name: json.name, id: json.id, image: json.imgName, loves: json.loves, wins: json.wins, games: json.games, defeats: json.defeats, age: json.age, food: json.favFood });
        }
        fetchData();
    }, [])
    return(
        <div> { hamster1 ? 
            <Profile Hamster={hamster1} />
        : 'no data' }
        </div>
    )
}

const GetHamsterTwo = ({hamster2, setHamster2}) => {
    const {id1, id2} = useParams();
    let url = null

    if (id2 === undefined) {
        url = 'http://localhost:3000/hamsters/random'
    } else {
        url = `http://localhost:3000/hamsters/${id2}`
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();

            setHamster2({ name: json.name, id: json.id, image: json.imgName, loves: json.loves, wins: json.wins, games: json.games, defeats: json.defeats, age: json.age, food: json.favFood });
        }
        fetchData();
    }, [])
    return(
        <div> { hamster2 ? 
            <Profile Hamster={hamster2} />
        : 'no data' }
        </div>
    )
}

const Battle = () => {
const history = useHistory();
const [hamster1, setHamster1] = useState(null);
const [hamster2, setHamster2] = useState(null);

    return(
        <Wrapper>
            <div onClick={()=> {ResolveGame(hamster1, hamster2, hamster1); history.push('/matchup')}}>
            <GetHamsterOne hamster1={hamster1} setHamster1={setHamster1} />
            </div>
            <h2>VS</h2>
            <div onClick={() => {ResolveGame(hamster1, hamster2, hamster2); history.push('/matchup')}}>
            <GetHamsterTwo hamster2={hamster2} setHamster2={setHamster2}/>
            </div>
        </Wrapper>
    )
}

export default Battle