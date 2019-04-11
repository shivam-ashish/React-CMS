import newsReducer from '../store/reducers/newsReducer';

it('handles action of type update news', () => {
  const action = {
    type: 'updateNews',
    payload: 'New News',
  };

  const newState = newsReducer({}, action);

  expect(newState.news).toEqual('New News');
});

it('handles action with unknown type', () => {
    const newState = newsReducer([], {});
    expect(newState.news).toBeFalsy();
  });