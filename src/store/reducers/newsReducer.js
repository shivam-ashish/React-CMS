const initialState = {
  news: null,
};

const newsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'updateNews':
      return {
        ...state,
        news: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default newsReducer;
