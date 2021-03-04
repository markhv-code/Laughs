// Action types
const LOAD_USERS = '/users/LOAD_USERS';
const LOAD_USER = '/users/LOAD_USER';
const ADD_USER = '/users/ADD_USER';

// Action creators
const load = (users) => ({
    type: LOAD_USERS,
    users,
});

const loadUser = (user) => ({
    type: LOAD_USER,
    user,
});

export const addUser = (user) => ({
    type: ADD_USER,
    user,
});

// Thunks
export const getUsers = () => async (dispatch) => {
    const res = await fetch('/api/users/');
    const json = await res.json();
    if (res.ok) {
        dispatch(load(json.users));
    }
};

export const getUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`);
    const json = await res.json();
    if (res.ok) {
        dispatch(loadUser(json));
    }
};
// Reducer
const initState = {};

const userReducer = (state = initState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case LOAD_USERS:
            for (let user of action.users) {
                newState[user.id] = user;
            }
            return newState;
        case LOAD_USER:
            newState[action.user.id] = action.user;
            return newState;
        case ADD_USER:
            newState[action.user.id] = action.user;
            return newState;
        default:
            return newState;
    }
};

export default userReducer;
