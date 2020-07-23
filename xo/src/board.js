import React, {useState} from 'react';


export default function (props) {

    const {cells, clicked, resetBoard} = props;
    const [winCells, setWinCells] = useState(Array(3).fill(Array(3).fill(false)));


    function renderCell(i, j) {

        if(cells[i][j] === null) return;

        if(cells[i][j]) return <p>X</p>;
        if(!cells[i][j]) return <p>O</p>;

    }

    function _clicked(i, j) {

        const _winCells = clicked(i, j);
        if (_winCells) setWinCells(_winCells);

        setTimeout( () => {
            resetBoard();
        }, 2000);
    }

    return(
        <div>
            {cells.map((row, i) => {
                row.map((cell, j) => (
                    <div onClick={() => _clicked(i, j)} className={winCells[i][j] ? 'pulse' : ''}>
                        {renderCell(i, j)}
                    </div>
                ))
            })}
        </div>
    )
}