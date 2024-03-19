import {store} from '../store';
import {fetchDataReducer} from '../store/slice';

const dispatch = store.dispatch;

export default fetchData = async () => {
  const response = await fetch('https://api.npoint.io/378e02e8e732bb1ac55b');

  const resData = await response.json();

  await dispatch(fetchDataReducer(resData));
};
