const initialState = {
  isLoggedIn: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_STATE':
      return {
        ...state,
        isLoggedIn: Boolean,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default reducer;
