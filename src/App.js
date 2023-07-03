import React from 'react';
import './App.css';
import Die from './components/die/Die';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti';
import BestStats from './components/best-stats/BestStats';

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [localStorageData, setLocalStorageData] = React.useState(null);

  React.useEffect(() => {
    if(rolls > 0 && tenzies){
      const gameRecord = JSON.parse(localStorage.getItem('stats'));
      if(gameRecord){
        const rollsRecord = gameRecord.rolls;
        const timeLeastRolls = gameRecord.timeLeastRolls;
        const timeRecord = gameRecord.time;
        const timeRecordRolls =gameRecord.bestTimeRolls;
        if(rolls < rollsRecord && time > timeRecord){
          console.log("Nowy rekord losowań!")
          const newGameInfo = JSON.stringify({rolls: rolls, timeLeastRolls: time, time: timeRecord, bestTimeRolls: timeRecordRolls});
          localStorage.setItem('stats', newGameInfo);
          setLocalStorageData(newGameInfo)
        }else if(time < timeRecord && rolls > rollsRecord){
          console.log("Nowy rekord czasu!")
          const newGameInfo = JSON.stringify({rolls: rollsRecord, timeLeastRolls: timeLeastRolls, time: time, bestTimeRolls: rolls})
          localStorage.setItem('stats', newGameInfo);
          setLocalStorageData(newGameInfo)
        }else if(time < timeRecord && rolls < rollsRecord){
          console.log("Nowy rekord losowań i czasu!")
          const newGameInfo = JSON.stringify({rolls: rolls, timeLeastRolls: time, time: time, bestTimeRolls: rolls})
          localStorage.setItem('stats', newGameInfo);
          setLocalStorageData(newGameInfo)
        }else{
          console.log('Nie udało się pobić rekordu!')
          return;
        }
      }else{
        const newGameInfo = JSON.stringify({rolls: rolls, timeLeastRolls: time, time: time, bestTimeRolls: rolls})
        localStorage.setItem('stats', newGameInfo);
        setLocalStorageData(newGameInfo)
      }
    }else{
      return
    }
  }, [tenzies, rolls, time])

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const sameValues = dice.every(die => die.value === firstValue)
    if(allHeld && sameValues){
      setIsPlaying(false);
      setTenzies(true);
      console.log('You won!')
    }else{
      setTenzies(false)
      return
    }
  }, [dice])

  React.useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => setTime(time + 10), 10);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, time]);

  function createNewDie() {
    const number = Math.ceil(Math.random() * 6);
    return {
      value: number, 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for(let i = 0; i < 10; i++){
      newDice.push(createNewDie());
    }
    return newDice;
  }
  
  const diceElements = dice.map(die => {
    return (
      <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld} 
        id={die.id} 
        holdDice={() => holdDice(die.id)}
      />
    )
  })

  function rollDice() {
    if(rolls === 0 && !isPlaying){
      startGame();
    }
    setRolls(rolls + 1)
    if(tenzies){
      setTenzies(false);
      setDice(allNewDice());
    }else{
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : createNewDie();
      }));
    }
  }

  function holdDice(id) {
    if(rolls === 0 && !isPlaying){
      startGame();
    }
    setDice(oldDice => oldDice.map((die) => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die;
    }))
  }

  const reset = () => {
    setTime(0);
  };

  function startGame() {
    setIsPlaying(true);
  }

  function resetGame() {
    setRolls(0)
    reset();
    setIsPlaying(false);
    setTenzies(false);
    setDice(allNewDice());
  }

  function msToTime(s) {
    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    if(ms > 0 && secs < 1){
      return '.' + ms/10 + 'ms';
    }else if(secs > 0 && mins < 1){
      return secs + 's ' + ms/10;
    }else if(mins > 0 && hrs < 1){
      return mins +'m ' + pad(secs) + 's';
    }else{
      return hrs + 'h ' +  mins + 'm ' + secs + 's';
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className="col-12 col-lg-8">
          <div className='game-panel'>
          {tenzies && <Confetti/>}
          <h1 className='title'>Dice Game</h1>
          <p className='instructions'>
            Roll unitll all dice are the same. 
            Click each die to freeze it at its current value between rolls.
          </p>
          {/* <div className='dice-container'>
            {diceElements}
          </div> */}
          <div className='cube-container col-12 d-flex justify-content-center align-items-center mb-5 px-3'>
            <div className='row d-flex justify-content-center align-items-center'>
              {diceElements}      
            </div>
          </div>
          <button className='roll-btn' onClick={tenzies ? resetGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
          <div className='game-stats col-12 d-flex justify-content-center align-items-center my-4'>
            <div className='row'>
              <span className='game-title col-12 d-flex justify-content-center align-items-center mb-3'>Game stats</span>
              <div className='rolls-count col-12 col-sm-6 d-flex justify-content-center align-items-center' >Rolls:&nbsp;<b>{rolls}</b></div>
              <div className='timer col-12 col-sm-6 d-flex justify-content-center align-items-center' >Time:&nbsp;<b>{time > 0 ? msToTime(time) : 0}</b></div>
            </div>
          </div>
          <button className={tenzies ? 'reset-btn-hide' : 'reset-btn mt-4'} onClick={resetGame}>Reset</button>

          </div>
        </div>
        <div className='records-panel col-12 col-lg-4 mt-4 mt-lg-0'>
          <BestStats msToTime={msToTime} localStorageData={localStorageData}/>        
        </div>
      </div>
    </div>
  );
}

export default App;
