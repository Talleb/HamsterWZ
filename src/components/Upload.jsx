import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Upload = () => {
    const history = useHistory();
    // const url = '/api/hamsters';
    const url = 'http://localhost:3000/hamsters'
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [loves, setLoves] = useState('');
    const [favFood, setFavfood] = useState('');
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);
            const json = await response.json();
            setId(json.length);
        }
        fetchData();
    }, [])
    async function uploadHamster() {
        const newHamster = {
            id: id,
            name: name,
            age: age,
            loves: loves,
            favFood: favFood,
            imgName: "default.jpeg",
            games: 0,
            wins: 0,
            defeats: 0
        }
        // const url = '/api/hamsters'
        const url = 'http://localhost:3000/hamsters'
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newHamster)
        })
        history.push('/')
        console.log(await response.text())
    }
    return (
        <div>
            <main className="Form">
                <form onSubmit={e => { e.preventDefault(); }}>
                    <label>Name</label>
                    <input value={name} type="text" onChange={e => setName(e.target.value)} placeholder="Enter name"></input>
                    <label>Age</label>
                    <input value={age} type="text" onChange={e => setAge(e.target.value)} placeholder="Enter age in years"></input>
                    <label>Loves</label>
                    <input value={loves} type="text" onChange={e => setLoves(e.target.value)} placeholder="What does the hamster love to do?"></input>
                    <label>Favourite food</label>
                    <input value={favFood} type="text" onChange={e => setFavfood(e.target.value)} placeholder="Enter hamsters favourite food"></input>
                </form>
                <button onClick={e => uploadHamster()}>Add new hamster</button>
            </main>
        </div >
    )
}
export default Upload;