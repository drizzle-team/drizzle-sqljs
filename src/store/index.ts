import { createMemoryHistory } from 'history';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/auth';
import suppliersReducer from './reducers/Suppliers';

export const history = createMemoryHistory();

// const rootReducer = combineReducers({
//   router: connectRouter(history),
//   loginReducer,
// });

const reducers = combineReducers({
  loginReducer,
  suppliersReducer,
});

export default configureStore({
  reducer: reducers,
});

export type State = ReturnType<typeof reducers>;
