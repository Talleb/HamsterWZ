import React, { useState, useEffect } from 'react';
import {LastGame} from './Stats.jsx'


export const LatestGame = (winner) => {
    console.log(winner)
    return(
        <>
        <LastGame showWinner={true}/>

</>
    )
}