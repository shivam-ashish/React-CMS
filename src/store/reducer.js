
const initialState = {
  isLoggedIn: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_STATE':
      return Object.assign({}, state, { isLoggedIn: Boolean });
    case 'UPDATE_USER':
      return Object.assign({}, state, { user: action.user });
    default:
      return state;
  }
};

export default reducer;
