
const initialState ={
    isLoggedIn: false,
    user: 'user1',
}

const reducer = ( state = initialState, action ) => {
    const newState = { ...state };
    switch (action.type){
    case "LOGIN_STATE":
    return{
        ...state,
        isLoggedIn: Boolean,
        history: state.history.concat({
            isLoggedIn: Boolean
        })
    };
    case "UPDATE_USER":
    return{
        ...state,
        
        history: state.history.concat({
            
        })
    };
    default:
    return newState;
}
};

export default reducer;