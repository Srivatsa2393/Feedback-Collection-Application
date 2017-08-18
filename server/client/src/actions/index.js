import axios from 'axios';
import { FETCH_USER } from './types';

// export const fetchUser = () => {
//   return function(dispatch) {
//     axios
//       .get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

//creating a new action creator for handling the token that comes from stripe
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

//submitting a survey action creator
export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);

  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};
