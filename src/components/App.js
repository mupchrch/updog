import React, { useEffect } from 'react';
import Board from './Board';
import { initDogs, toggleDog, clearDogs, setGrid, setDogsPerMatch } from '../actions';
import './App.css';
import { connect } from 'react-redux';

function App({ initDogs, setGrid, setDogsPerMatch, onReplay, dogs, numColumns, numRows, dogsPerMatch, possibleDogsPerMatch, isGameWon, ...props }) {
  const numMatches = dogs.filter(dog => dog.isMatched).length / dogsPerMatch;

  useEffect(() => {
    if (!isGameWon) {
      const numDogs = (numColumns * numRows) / dogsPerMatch;

      fetch('https://dog.ceo/api/breeds/image/random/' + numDogs)
        .then(response => response.json())
        .then(json => initDogs(json.message));
    }
  }, [dogsPerMatch, numColumns, numRows, isGameWon]);

  function handleNumColumns(e) {
    setGrid(e.target.value, numRows);
  }

  function handleNumRows(e) {
    setGrid(numColumns, e.target.value);
  }

  function handleDogsPerMatch(e) {
    setDogsPerMatch(e.target.value);
  }

  return (
    <div className='App'>
      <div className='input-header'>
        <fieldset>
          <legend>Board size:</legend>
          <input type='number' min={0} max={10} value={numColumns} onChange={handleNumColumns} />
          x
          <input type='number' min={0} max={10} value={numRows} onChange={handleNumRows} />
        </fieldset>
        <label>Amount per match:
          <select id='dogsPerMatch' value={dogsPerMatch} onChange={handleDogsPerMatch}>
            {
              possibleDogsPerMatch.map(val =>
                <option key={val} value={val}>{val}</option>
              )
            }
          </select>
        </label>
        <div>Matches: {numMatches} / {dogs.length/dogsPerMatch}</div>
      </div>
      <Board dogs={dogs} numColumns={numColumns} {...props} />
      <div className='winner' hidden={!isGameWon}>
        <div>YOU WIN</div>
        <button onClick={() => onReplay()}>play again?</button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isGameWon: state.gameInfo.dogs && state.gameInfo.dogs.length > 0 ? state.gameInfo.dogs.every(dog => dog.isMatched) : false,
  dogs: state.gameInfo.dogs,
  numColumns: state.gameInfo.numColumns,
  numRows: state.gameInfo.numRows,
  dogsPerMatch: state.gameInfo.dogsPerMatch,
  possibleDogsPerMatch: state.gameInfo.possibleDogsPerMatch
});
const mapDispatchToProps = (dispatch) => ({
  initDogs: (dogs, dogsPerMatch, numDogs) => dispatch(initDogs(dogs, dogsPerMatch, numDogs)),
  onDogSelect: id => dispatch(toggleDog(id)),
  onReplay: () => dispatch(clearDogs()),
  setGrid: (numColumns, numRows) => dispatch(setGrid(numColumns, numRows)),
  setDogsPerMatch: dogsPerMatch => dispatch(setDogsPerMatch(dogsPerMatch))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
