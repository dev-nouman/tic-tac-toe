import React, { useState } from "react";
import "./TicTacToe.css";
import circle_icon from "@/assets/circle.png";
import cross_icon from "@/assets/cross.png";

const TicTacToe = () => {

    const [board, setBoard] = useState(Array(9).fill(""));
    const [isCrossTurn, setIsCrossTurn] = useState(true);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState("");

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWin = (newBoard) => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;

            if (
                newBoard[a] &&
                newBoard[a] === newBoard[b] &&
                newBoard[a] === newBoard[c]
            ) {
                setLock(true);
                setWinner(newBoard[a]);
                return;
            }
        }
    };

    const handleClick = (index) => {
        if (lock || board[index] !== "") return;

        const newBoard = [...board];
        newBoard[index] = isCrossTurn ? "x" : "o";

        setBoard(newBoard);
        setIsCrossTurn(!isCrossTurn);

        checkWin(newBoard);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(""));
        setIsCrossTurn(true);
        setLock(false);
        setWinner("");
    };

    const renderIcon = (value) => {
        if (value === "x") return <img src={cross_icon} alt="x" />;
        if (value === "o") return <img src={circle_icon} alt="o" />;
        return null;
    };

    return (
        <div className="container">

            <h1 className="title">
                {winner
                    ? `Congrats ${winner.toUpperCase()} Wins 🎉`
                    : "Tic Tac Toe In React"}
            </h1>

            <div className="board">
                {board.map((value, index) => (
                    <div
                        key={index}
                        className="boxes"
                        onClick={() => handleClick(index)}
                    >
                        {renderIcon(value)}
                    </div>
                ))}
            </div>

            <button className="reset" onClick={resetGame}>
                Reset
            </button>
        </div>
    );
};

export default TicTacToe;