import { createAction, props } from '@ngrx/store';
import { UnitFilter } from '../models/units.model';

export const setFilter = createAction(
  '[Units] Set Filter',
  props<{ filters: UnitFilter }>()
);
