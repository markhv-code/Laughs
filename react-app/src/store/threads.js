const ADD_THREAD = '/jokes/ADD_THREAD';

const addthread = thread => ({
    type: ADD_THREAD,
    thread,
})

export const createThread = (newThread) => async (dispatch) => {
    const res = await fetch('/api/threads');
    const json = await res.json();
    if(res.ok){
        dispatch(addthread(json))
    } 
}