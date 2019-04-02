const initialState = {
  news: null,
};

const newsReducer = (state = initialState, { payload }) => {
  return {
    ...state,
    news: payload,
  };
};

export default newsReducer;
