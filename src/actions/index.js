export const initDogs = (dogs, dogsPerMatch) => ({
  type: 'INIT_DOGS',
  dogs,
  dogsPerMatch
});

export const toggleDog = id => ({
  type: 'TOGGLE_DOG',
  id
});

export const clearDogs = () => ({
  type: 'CLEAR_DOGS'
});