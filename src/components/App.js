import React, { useEffect } from 'react';
import Board from './Board';
import { initDogs, toggleDog, clearDogs } from '../actions';
import './App.css';
import { connect } from 'react-redux';

function App({ initDogs, onReplay, dogs, isGameWon, ...props }) {
  const numDogs = 8;
  const dogsPerMatch = 2;
  const numMatches = dogs.filter(dog => dog.isMatched).length / dogsPerMatch;

  useEffect(() => {
    if (dogs.length === 0) {
      fetch('https://dog.ceo/api/breeds/image/random/' + numDogs)
        .then(response => response.json())
        .then(json => initDogs(json.message, dogsPerMatch));
    }
  });

  return (
    <div className='App'>
      <div className='matches'>Matches: {numMatches} / {dogs.length/dogsPerMatch}</div>
      <Board dogs={dogs} {...props} />
      <div className='winner' hidden={!isGameWon}>
        <div>YOU WIN</div>
        <button onClick={() => onReplay()}>play again?</button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isGameWon: state.dogs && state.dogs.length > 0 ? state.dogs.every(dog => dog.isMatched) : false,
  dogs: state.dogs
});
const mapDispatchToProps = (dispatch) => ({
  initDogs: (dogs, dogsPerMatch) => dispatch(initDogs(dogs, dogsPerMatch)),
  onDogSelect: id => dispatch(toggleDog(id)),
  onReplay: () => dispatch(clearDogs())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
