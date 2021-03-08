const ADD_THREAD = '/jokes/ADD_THREAD';

const addThread = thread => ({
    type: ADD_THREAD,
    thread,
})

export const createThread = (newThread) => async (dispatch) => {
    const { userId, jokeId, comment } = newThread;

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('jokeId', jokeId);
    formData.append('comment', comment);
    
    const res = await fetch('/api/threads', {
      method: 'POST',
      body: formData,
    });
    const addedThread = await res.json();
    if (!addedThread.errors) {
      dispatch(addThread(addedThread));
      return addedThread;
    } else {
      const errors = addedThread;
      return errors;
    };
};

const initState = {};

const threadReducer = (state = initState, action) => {
    const newState = {...state};

    switch(action.type){
        case ADD_THREAD:
            newState[action.thread.id] = action.thread;
            return newState;
        default:
            return newState;
    };
};

export default threadReducer;