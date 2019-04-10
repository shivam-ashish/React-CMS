const initialState = {
  blogs: null,
};

const blogReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'updateBlogs':
      return {
        ...state,
        blogs: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default blogReducer;
