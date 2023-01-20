import { createActionCreators } from 'immer-reducer';
import { DashObjType, LoginReducer } from '../reducers/auth';
import { AsyncAction } from './common';

export const loginActions = createActionCreators(LoginReducer);

export type LoginActions = ReturnType<typeof loginActions.setQueryResponse>;

export const setQuery =
  (response: DashObjType): AsyncAction =>
  async (dispatch: any) => {
    try {
      dispatch(loginActions.setQueryResponseDashboard(response));
    } catch (e) {
      // console.log(e);
    }
  };

export const setLoadedFile =
    (loadedFile: boolean): AsyncAction =>
        async (dispatch: any) => {
            try {
                dispatch(loginActions.setLoadedFile(loadedFile));
            } catch (e) {
                // console.log(e);
            }
        };
