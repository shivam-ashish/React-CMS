import blogReducer from '../store/reducers/blogReducer';

it('handles action of type update blogs', () => {
  const action = {
    type: 'updateBlogs',
    payload: 'New Blog',
  };

  const newState = blogReducer([], action);

  expect(newState.blogs).toEqual('New Blog');
});

it('handles action with unknown type', () => {
  const newState = blogReducer([], {});
  expect(newState.blogs).toBeFalsy();
});
