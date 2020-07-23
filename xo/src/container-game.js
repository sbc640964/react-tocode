import React, {useState} from 'react';

import Board from './board';
import PanelScores from './panel-scorce';

export default function ({sound}) {

    const [currentPlayer, setCurrentPlayer] = useState(false);
    const [gameMode, setGameMode] = useState(false);
    const [cells, setCells] = useState(() => Array(3).fill(Array(3).fill(0)));
    const [scores, setScores] = useState([0,0,0]);

    function clicked(topIndex, index){

        const newCells = new Array(...cells).map( (t, i) => new Array(...cells[i]));
        newCells[topIndex][index] = currentPlayer;

        setCells(newCells);

        const win = checkWin();

        if(!win && !gameMode){
            autoPlayer();
        }

        if(!win && sound){
            //return play the click sound
        }

        return win;
    }

    function checkWin(){

        let win;
        let winCells;
        //check if win
        //and set the scores

        if(win && sound){
            //play the win sound
        }

        const newScores = [...scores];
        newScores[Number(currentPlayer)] = scores[Number(currentPlayer)] + 1;
        setScores(newScores);

        return win ? winCells : false;
    }

    function resetBoard() {
        setCurrentPlayer(false);
        setCells(Array(3).fill(Array(3).fill(0)));

        if(!gameMode){
            autoPlayer();
        }
    }

    function autoPlayer() {
        //the computer step -> clicked(i,j)
    }

    function resetGame() {
        setScores([0,0,0]);
        resetBoard();
    }

    return(
        <div>
            <Board cells={cells} clicked={clicked} win={[/**/]} resetBoard={resetBoard}/>
            <PanelScores gameMode={gameMode} setGameMode={setGameMode} scores={scores}/>
        </div>
    )
}