import { createReducerFunction, ImmerReducer } from 'immer-reducer';

export type DashObjType = {
  query: Array<string>;
  time: string;
};

export interface SuppliersState {
  suppliers: any | null;
}

const initialState: SuppliersState = {
  suppliers: null,
};

export class SuppliersReducer extends ImmerReducer<SuppliersState> {
  setSuppliers(suppliers: any) {
    this.draftState.suppliers = suppliers;
  }
}

export default createReducerFunction(SuppliersReducer, initialState);
