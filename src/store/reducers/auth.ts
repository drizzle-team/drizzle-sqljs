import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export type DashObjType = {
  query: Array<string>;
  time: string;
};

export interface LoginState {
  queryResponse: any | null;
  queryResponseDashboard: Array<DashObjType> | null;
  loadedFile: boolean
}

const initialState: LoginState = {
  queryResponse: null,
  queryResponseDashboard: null,
  loadedFile: false
};

export class LoginReducer extends ImmerReducer<LoginState> {
  setQueryResponse(queryResponse: any) {
    this.draftState.queryResponse = queryResponse;
  }

  setLoadedFile(loadedFile: boolean) {
    this.draftState.loadedFile = loadedFile;
  }

  setQueryResponseDashboard(queryResponseDashboard: DashObjType) {
    if (this.draftState.queryResponseDashboard) {
      this.draftState.queryResponseDashboard = [
        ...this.draftState.queryResponseDashboard,
        queryResponseDashboard,
      ];
    } else {
      this.draftState.queryResponseDashboard = [queryResponseDashboard];
    }
  }


  clearQuery(queryResponse: any) {
    this.draftState.queryResponseDashboard = null;
  }
}

export default createReducerFunction(LoginReducer, initialState);
