
const initialState = {
  isLoggedIn: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  console.log('Reducer Running', action);

//   const newState = { ...state };
  switch (action.type) {
    case 'LOGIN_STATE':
    //   return {
        // ...state,
        // isLoggedIn: Boolean,
        // history: state.history.concat({
        //   isLoggedIn: Boolean,
        // }),
        return Object.assign({},state,{isLoggedIn: Boolean})
    //   };
    case 'UPDATE_USER':
    //   return {
        //   isLoggedIn: action.isLoggedIn,
        // ...state,

        // history: state.history.concat({
            return Object.assign({},state,{user: action.user})
        // }),
    //   };
    default:
    //   return newState;
    return state;
  }
};

export default reducer;
