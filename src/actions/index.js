export const initDogs = dogs => ({
  type: 'INIT_DOGS',
  dogs
});

export const toggleDog = id => ({
  type: 'TOGGLE_DOG',
  id
});

export const clearDogs = () => ({
  type: 'CLEAR_DOGS'
});

export const setGrid = (numColumns, numRows) => ({
  type: 'SET_GRID',
  numColumns,
  numRows
});

export const setDogsPerMatch = dogsPerMatch => ({
  type: 'SET_DOGS_PER_MATCH',
  dogsPerMatch
});