import { createActionCreators } from 'immer-reducer';
import { AsyncAction } from './common';
import { SuppliersReducer } from '../reducers/Suppliers';

export const supplierAction = createActionCreators(SuppliersReducer);

export type SupplierActions = ReturnType<typeof supplierAction.setSuppliers>;

export const setSuppliersAction =
  (response: any): AsyncAction =>
  async (dispatch: any) => {
    try {
      dispatch(supplierAction.setSuppliers(response));
    } catch (e) {
      // console.log(e);
    }
  };
