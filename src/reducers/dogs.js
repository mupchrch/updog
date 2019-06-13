// https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// https://stackoverflow.com/a/43802308
const factors = number => [...Array(number + 1).keys()]
  .filter(i => number % i === 0);

const dogs = (state = { numColumns: 4, numRows: 4, dogsPerMatch: 2, possibleDogsPerMatch: factors(16), dogs: [] }, action) => {
  switch (action.type) {
    case 'INIT_DOGS':
      let duplicateDogs = [];
      for (let i=0; i<state.dogsPerMatch; i++) {
        duplicateDogs = [...duplicateDogs, ...action.dogs];
      }

      shuffleArray(duplicateDogs);

      const dogs = duplicateDogs.map((dog, i) => {
        return {
          id: i,
          url: dog,
          isSelected: false,
          isMatched: false
        };
      });

      return {
        ...state,
        dogs
      };
    case 'TOGGLE_DOG':
      const i = state.dogs.findIndex(item => item.id === action.id);
      const newDogs = [...state.dogs];
      newDogs[i].isSelected = !newDogs[i].isSelected;

      // check match
      if (newDogs[i].isSelected) {
        // see if currently selected items match
        const isValidMatch = newDogs.filter(item => item.isSelected).every((item, i, arr) => item.url === arr[0].url);

        if (isValidMatch) {
          // check if they're all selected
          const potentialMatches = newDogs.filter(item => item.url === newDogs[i].url);
          const isCompleteMatch = potentialMatches.every(item => item.isSelected);

          if (isCompleteMatch) {
            // clear selections and flag as matched
            potentialMatches.forEach(item => {
              item.isMatched = true;
              item.isSelected = false;
            });
          }
        } else {
          // clear out all selections
          newDogs.forEach(item => item.isSelected = false);
        }
      }

      return { ...state, dogs: newDogs };
    case 'CLEAR_DOGS':
      return { ...state, dogs: [] };
    case 'SET_GRID':
      return {
        ...state,
        numColumns: action.numColumns,
        numRows: action.numRows,
        possibleDogsPerMatch: factors(action.numColumns * action.numRows)
      }
    case 'SET_DOGS_PER_MATCH':
      return {
        ...state,
        dogsPerMatch: action.dogsPerMatch
      }
    default:
      return state;
  }
}

export default dogs;