// https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const dogs = (state = [], action) => {
  switch (action.type) {
    case 'INIT_DOGS':
      let duplicateDogs = [];
      for (let i=0; i<action.dogsPerMatch; i++) {
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

      return dogs;
    case 'TOGGLE_DOG':
      const i = state.findIndex(item => item.id === action.id);
      const newDogs = [...state];
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

      return newDogs;
    case 'CLEAR_DOGS':
      return [];
    default:
      return state;
  }
}

export default dogs;