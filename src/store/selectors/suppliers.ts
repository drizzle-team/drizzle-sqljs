import { createSelector, Selector } from 'reselect';
import { State } from '../index';

const selectSupplier = (state: State) => state.suppliersReducer;

export const selectSuppliers: Selector<State, any | null> =
  createSelector(selectSupplier, ({ suppliers }) => suppliers);
