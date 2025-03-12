import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UnitsState } from '../reducers/units.reducer';

export const selectUnitsState = createFeatureSelector<UnitsState>('units');

export const selectAllUnits = createSelector(selectUnitsState, (state) => state.units);

export const selectFilter = createSelector(selectUnitsState, (state) => state.filters);

export const selectFilteredUnits = createSelector(
  selectAllUnits,
  selectFilter,
  (units, filters) => {
    if (!filters) {
      return units;
    }
    return units.filter((unit) => {
      const { cost } = unit;
      const { age, wood, gold, food } = filters;
      if (age && age !== 'All' && unit.age !== age) {
        return false;
      }
      if (wood && ((cost?.Wood ?? 0) < wood.min || (cost?.Wood ?? 0) > wood.max)) {
        return false;
      }
      if (gold && ((cost?.Gold ?? 0) < gold.min || (cost?.Gold ?? 0) > gold.max)) {
        return false;
      }
      if (food && ((cost?.Food ?? 0) < food.min || (cost?.Food ?? 0) > food.max)) {
        return false;
      }
      return true;
    });
  }
);

export const selectUnit = (id: number) =>
  createSelector(selectAllUnits, (units) => units.find((unit) => unit.id === id) || null);
