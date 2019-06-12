export const initDogs = dogs => ({
  type: 'INIT_DOGS',
  dogs: dogs
});

export const toggleDog = id => ({
  type: 'TOGGLE_DOG',
  id
});