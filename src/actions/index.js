import axios from 'axios';


export const fetchColors = () => async dispatch => {
  const response = await axios.get('https://www.colourlovers.com/api/palettes/new?format=json');

  dispatch({ type: 'FETCH_COLORS', payload: response.data });
}
