import React, {useState} from 'react';

import Board from './board';
import PanelScores from './panel-scorce';

export default function ContainerGame({sound}) {

    const [currentPlayer, setCurrentPlayer] = useState(false);
    const [gameMode, setGameMode] = useState(false);
    const [cells, setCells] = useState(() => Array(3).fill(Array(3).fill(null)));
    const [scores, setScores] = useState([0,0,0]);

    function clicked(topIndex, index){

        const newCells = new Array(...cells).map( (t, i) => new Array(...cells[i]));
        newCells[topIndex][index] = currentPlayer;

        setCells(newCells);

        const win = checkWin();

        if(!win && !gameMode && !currentPlayer){
            autoPlayer();
        }

        if(!win && sound){
            //return play the click sound
        }

        return win;
    }

    function checkWin(){

        let win = false;
        let winCells = false;
        //check if win
        //and set the scores

        if(win && sound){
            //play the win sound
        }

        if(win){
            const newScores = [...scores];
            newScores[Number(currentPlayer)] = scores[Number(currentPlayer)] + 1;
            setScores(newScores);
        }

        setCurrentPlayer( v => !v);

        return win ? winCells : false;
    }

    function resetBoard() {
        setCurrentPlayer(false);
        setCells(Array(3).fill(Array(3).fill(null)));

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
        <div className="container">
            <Board cells={cells} clicked={clicked} win={[/**/]} resetBoard={resetBoard}/>
            <PanelScores gameMode={gameMode} setGameMode={setGameMode} scores={scores}/>
        </div>
    )
}