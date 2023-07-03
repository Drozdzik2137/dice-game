import './BestStats.css'
import React from 'react'

export default function BestStats(props) {
    const [bestGame, setBestGame] = React.useState(() => {
        const newGameInfo = JSON.parse(localStorage.getItem('stats'));
        if(newGameInfo){
            return newGameInfo;
        }else{
            return null;
        }
    });

    React.useEffect(() => {
        const newGameInfo = JSON.parse(localStorage.getItem('stats'));
        if (newGameInfo && newGameInfo !== bestGame) {
          setBestGame(newGameInfo);
        }
    }, [props.localStorageData]);

    React.useEffect(() => {
        const handleStorageChange = (event) => {
          if (event.key === 'stats') {
            const newGameInfo = JSON.parse(event.newValue);
            setBestGame(newGameInfo);
          }
        };
      
        // Rejestrujemy nasłuchiwanie zdarzenia storage
        window.addEventListener('storage', handleStorageChange);
      
        // Czyszczenie nasłuchiwania po zakończeniu
        return () => {
          window.removeEventListener('storage', handleStorageChange);
        };
      }, []);
    

    return (
        <div className='best-stats col-12'>
          <div className='row'>
            <span className='title text-center mb-4'>Game records</span>
            <div className='best-game col-12 mb-4 mx-3'>
              <div className='row'>
                <span className='best-game-title mb-1'>Best single game time</span>
                <span className='best-time'>Best time:&nbsp;<b>{bestGame?.time ? props.msToTime(bestGame.time) : 'No data'}</b></span>
                <span className='best-time-rolls'>Rolls: &nbsp;<b>{bestGame?.bestTimeRolls ? bestGame.bestTimeRolls : 'No data'}</b></span>
              </div>
            </div>
            <div className='rolls-record col-12 mx-3'>
              <div className='row'>
                <span className='rolls-record-title mb-1'>Least single game rolls</span>
                <span className='rolls-record-time'>Least rolls game time:&nbsp;<b>{bestGame?.timeLeastRolls ? props.msToTime(bestGame.timeLeastRolls) : 'No data'}</b></span>
                <span className='rolls-record-rolls'>Rolls:&nbsp;<b>{bestGame?.rolls ? bestGame.rolls : 'No data'}</b></span>
              </div>
            </div>
          </div>
        </div>
    )
}