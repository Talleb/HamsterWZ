import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    return(
        <div className="Home">
        <h1>Welcome to HamsterWarz!</h1>
        <p>Lets get started</p>
        <button onClick={() => history.push('/battle')}>Battle</button>
        </div>
    )
}

export default Home

