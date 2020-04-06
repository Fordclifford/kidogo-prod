import { createStore } from 'redux';
import userData from '../reducers/User';

const userStore = createStore(userData);
  

export default userStore;