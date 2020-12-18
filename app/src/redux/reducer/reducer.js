import * as Action from '../actions/actions'

const storedState = {
    cyberpunk: false,
    user: {},
}

const reducer = (state = storedState, action) => {

    switch (action.type) {
        case Action.CHANGE_THEME:
            const newState = { ...state };
            newState.cyberpunk = !newState.cyberpunk;
            return newState;
        default:
            break;
    }
    return state;
}

export default reducer;