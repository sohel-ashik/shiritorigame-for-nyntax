
import { useEffect, useState } from 'react';
import './App.css'
import SingleGameBoard from './SingleGameBoard'

function App() {

  const [playerOneWords, setPlayerOneWords] = useState({});
  const [playerTwoWords, setPlayerTwoWords] = useState({});

  const [lastChar, setLastChar] = useState('');

  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);

  const [turn, setTurn] = useState(1);
  const [win ,setWin] = useState(0); 

  useEffect(()=>{
      const chars = "abcdefghijklmnopqrstuvwxyz";
      const char =  chars[Math.floor(Math.random()*26)];
      setLastChar(char);
    
  },[win])

  function finish(){
    setTurn(0);
    if(playerOneScore > playerTwoScore) setWin(1);
    else if( playerOneScore < playerTwoScore) setWin(2);
    else setWin("none");
  }

  function restart(){
    setTurn(1);
    setWin(0);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setPlayerOneWords({});
    setPlayerTwoWords({});
  }

  return (
    <>
      <div className='w-full h-fit py-10 flex flex-col items-center justify-center'>
        <button onClick={win ? restart : finish} className='bg-green-900 hover:bg-green-500 px-5 py-2 text-white rounded-md'>{win ? "Restart" : "Finish"}</button>
        {
          win && win !== 'none' ? <div className='text-center font-bold py-10'>Player {win} won the game !!!</div> : win ==='none' && <div className='text-center font-bold py-10'>Draw !!!</div>
        }
        <h1 className='p-4 font-bold text-xl'>Shiritori Game</h1>
        <div className='flex justify-center gap-10'>
          <SingleGameBoard player={1} lastChar={lastChar} allWords={playerOneWords} setToAllWords = {setPlayerOneWords} setLastChar={setLastChar}
            score={playerOneScore}
            setScore={setPlayerOneScore}
            otherPlayerAllWords={playerTwoWords}
            turn={turn}
            setTurn={setTurn}
          />

          <SingleGameBoard player={2} lastChar={lastChar}  allWords={playerTwoWords} setToAllWords = {setPlayerTwoWords} setLastChar={setLastChar}
            score={playerTwoScore}
            setScore={setPlayerTwoScore}
            otherPlayerAllWords={playerOneWords}
            turn={turn}
            setTurn={setTurn}
          />
        </div>
      </div>
    </>
  )
}

export default App
