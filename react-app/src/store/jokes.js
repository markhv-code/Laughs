const LOAD_JOKES = '/jokes/LOAD_JOKES';
const LOAD_JOKE = '/jokes/LOAD_JOKE';
const ADD_JOKE = '/jokes/ADD_JOKE';
const REMOVE_JOKE = '/jokes/REMOVE_JOKE';

const load = (jokes) => ({
    type: LOAD_JOKES,
    jokes,
});

const loadJoke = (joke) => ({
    type: LOAD_JOKE,
    joke,
});

const addJoke = (joke) => ({
    type: ADD_JOKE,
    joke,
});

const removeJoke = (joke) => ({
    type: REMOVE_JOKE,
    joke
})

export const getJokes = () => async (dispatch) => {
    const res = await fetch('/api/jokes');
    const json = await res.json();
    if (res.ok) {
        dispatch(load(json.jokes))
    };
};

export const createJoke = (newJoke, jokeIDtoUpdate = null) => async (dispatch) => {
    const { userId, joke, imageURL, image, jokeType, threadId } = newJoke;
    
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('joke', joke);
    formData.append('imageURL', imageURL);
    formData.append('jokeType', jokeType);
    formData.append('threadId', threadId);

    if (image) formData.append('image', image);
    
    const res = await fetch('/api/jokes');
    const json = await res.json();
    if (res.ok) {
        dispatch(load(json.jokes))
    };

     if (jokeIDtoUpdate) {
        // for updating joke
        const res = await fetch(`/api/jokes/${jokeIDtoUpdate}`, {
        method: 'PUT',
        body: formData,
        });

        const updatedJoke = await res.json();

        if (res.ok) {
        dispatch(addJoke(updatedJoke));
        return updatedJoke;
        } else {
        const errors = updatedJoke;
        return errors;
        }
    }
};

export const deleteJoke = (jokeId) => async (dispatch) => {
  const res = await fetch(`/api/jokes/${jokeId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(removeJoke(jokeId));
  }
};

const initState = {};

const jokeReducer = (state = initState, action) => {
    const newState = { ...state };

    switch(action.type) {
        case LOAD_JOKES:
            for (let joke of action.jokes) {
                newState[joke.id] = pet;
            }
            return newState;
        case ADD_JOKE:
            newState[action.joke.id] = action.joke;
            return newState;
        case REMOVE_JOKE:
            delete newState[Number(action.jokeId)];
            return newState
        default:
            return newState;
    };
};

export default jokeReducer;