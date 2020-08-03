import React from 'react';

export default function (props) {

    const {gameMode, setGameMode, scores} = props;

    return(
        <div className="panel-scores">
            <div>
                <div onClick={ () => setGameMode(v => !v)}>
                    <h3>players</h3>
                    <h2>{gameMode ? '1' : '2'}</h2>
                </div>
            </div>
            <div>
                <h3>Player 1 Scores</h3>
                <h2>{scores[0]}</h2>
            </div>
            <div>
                <h3>...</h3>
                <h2>{scores[2]}</h2>
            </div>
            <div>
                <h3>Player 2 Scores</h3>
                <h2>{scores[1]}</h2>
            </div>
        </div>
    )
}