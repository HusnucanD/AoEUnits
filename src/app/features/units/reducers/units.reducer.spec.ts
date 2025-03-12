import * as unitsReducer from './units.reducer';
import { setFilter } from '../actions/units.actions';

describe('UnitsReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = unitsReducer;
      const action = {
        type: 'Unknown',
      };
      const state = unitsReducer.unitsReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });

  describe('setFilter action', () => {
    it('should retrieve the filters', () => {
      const { initialState } = unitsReducer;
      const newState: unitsReducer.UnitsState = {
        ...initialState,
        filters: {
          age: 'Dark',
          wood: { min: 50, max: 100 },
          gold: { min: 100, max: 200 },
          food: { min: 0, max: 200 },
        },
      };
      const action = setFilter({
        filters: {
          age: 'Dark',
          wood: { min: 50, max: 100 },
          gold: { min: 100, max: 200 },
          food: { min: 0, max: 200 },
        },
      });
      const state = unitsReducer.unitsReducer(initialState, action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });
});
