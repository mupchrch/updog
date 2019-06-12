import React, { useEffect } from 'react';
import Board from './Board';
import { initDogs, toggleDog } from '../actions';
import './App.css';
import { connect } from 'react-redux';

function App({ initDogs, dogs, ...props }) {
  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random/8')
      .then(response => response.json())
      .then(json => initDogs(json.message));
  }, [initDogs]);

  return (
    <div className="App">
      <Board dogs={dogs} {...props} />
    </div>
  );
}

const mapStateToProps = state => ({
  dogs: state.dogs
});
const mapDispatchToProps = (dispatch) => ({
  initDogs: dogs => dispatch(initDogs(dogs)),
  onDogSelect: id => dispatch(toggleDog(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
