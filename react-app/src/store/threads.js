const ADD_THREAD = '/jokes/ADD_THREAD';
const LOAD_THEADS = '/threads/LOAD_THREADS';

const addThread = thread => ({
    type: ADD_THREAD,
    thread,
});

const load = (threads) => ({
  type: LOAD_THEADS,
  threads,
})

export const getThreads = () => async (dispatch) => {
  const res = await fetch('/api/threads');
  const json = await res.json();
  if (res.ok){
    dispatch(load(json.threads));
  }
};

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
        case LOAD_THEADS:
            for( let thread of action.threads){
              newState[thread.id] = thread;
            }
            return newState;
        default:
            return newState;
    };
};

export default threadReducer;