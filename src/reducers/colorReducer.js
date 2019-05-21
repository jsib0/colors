export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_COLORS':
      return action.payload;
    default:
      return state
  }
}
