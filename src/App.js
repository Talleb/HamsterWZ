import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from 'react-router-dom';
import Battle from './components/Battle';
import Home from './components/Home';
import {LeaderBoard} from './components/Stats';
import {LoserBoard} from './components/Stats';
import {LatestGame} from './components/Matchup';
import Upload from './components/Upload';

function App() {
  return (
    <Router>
    <header className="Nav-link">
      <nav>
    <Link to="/"> Home </Link>
		<Link to="/battle"> Battle </Link>
		<Link to="/stats"> Statistics </Link>
		<Link to="/matchup"> Match </Link>
		<Link to="/upload"> Upload </Link>
    </nav>
    </header>
	    <main>
	  <Switch>
    <Route path="/upload"> 
       <div className="Battle-header">    
          <Upload/>
          </div>
          </Route>
      <Route path="/battle/:id1/:id2"> 
       <div className="Battle-header">    
          <Battle/>
          </div>
          </Route>
      <Route path="/battle"> 
       <div className="Battle-header">    
          <Battle/>
          </div>
          </Route>
          <Route path="/stats"> 
        <LoserBoard/>
        <LeaderBoard/>
         </Route>
         <Route path="/matchup/:id1/:id2"> 
        <LatestGame/>
         </Route>
         <Route path="/matchup"> 
        <LatestGame/>
         </Route>
		  <Route path="/"> 
        <Home/>
      </Route>
	  </Switch>
	    </main>
</Router>
  );
}

export default App;