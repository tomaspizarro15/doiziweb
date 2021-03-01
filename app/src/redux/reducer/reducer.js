import * as Action from '../actions/actions'

const storedState = {
    cyberpunk: false,
    user: {},
}

const reducer = (state = storedState, action) => {
    switch (action.type) {
        case Action.SET_USER:
            const newState = { ...state };
            newState.user = action.payload; 
            return newState;
        default:
            break;
    }
    return state;
}

export default reducer;