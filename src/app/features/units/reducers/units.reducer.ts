import { createReducer, on } from '@ngrx/store';
import * as UnitsActions from '../actions/units.actions';
import { Unit, UnitFilter } from '../models/units.model';
import dataJson from '../../../../../public/data/data.json';

export interface UnitsState {
  units: Unit[];
  filters?: UnitFilter;
}

export const initialState: UnitsState = {
  units: dataJson.units,
  filters: undefined,
};

export const unitsReducer = createReducer(
  initialState,
  on(UnitsActions.setFilter, (state, { filters }) => ({
    ...state,
    filters,
  }))
);
