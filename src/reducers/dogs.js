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
      const doubleDogs = [...action.dogs, ...action.dogs];
      shuffleArray(doubleDogs);

      return doubleDogs.map((dog, i) => {
        return {
          id: i,
          url: dog,
          isSelected: false,
          isMatched: false
        };
      });
    case 'TOGGLE_DOG':
      const i = state.findIndex(item => item.id === action.id);
      const newState = [...state];
      newState[i].isSelected = !newState[i].isSelected;

      // check match
      if (newState[i].isSelected) {
        // see if currently selected items match
        const validMatch = newState.filter(item => item.isSelected).every((item, i, arr) => item.url === arr[0].url);
        // if they do then check if they're all selected
        if (validMatch) {
          const potentialMatches = newState.filter(item => item.url === newState[i].url);
          const completeMatch = potentialMatches.every(item => item.isSelected);

          if (completeMatch) {
            potentialMatches.forEach(item => {
              item.isMatched = true;
              item.isSelected = false;
            });
          }
        } else {
          // clear out all selections
          return newState.map(item => {
            item.isSelected = false;
            return item;
          });
        }
      }

      return newState;
    default:
      return state;
  }
}

export default dogs;