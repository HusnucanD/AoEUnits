import { UnitsState } from '../reducers/units.reducer';
import { selectAllUnits, selectFilter, selectFilteredUnits, selectUnit } from './units.selectors';

describe('Unit Selectors', () => {
  const initialState: UnitsState = {
    units: [
      {
        id: 1,
        name: 'Archer',
        description: 'Quick and light. Weak at close range; excels at battle from distance',
        expansion: 'Age of Kings',
        age: 'Feudal',
        cost: {
          Wood: 25,
          Gold: 45,
        },
        build_time: 35,
        reload_time: 2,
        attack_delay: 0.35,
        movement_rate: 0.96,
        line_of_sight: 6,
        hit_points: 4,
        range: 30,
        attack: 4,
        armor: '0/0',
        accuracy: '80%',
      },
      {
        id: 2,
        name: 'Crossbowman',
        description: 'Upgraded archer',
        expansion: 'Age of Kings',
        age: 'Castle',
        cost: {
          Wood: 75,
          Gold: 150,
        },
        build_time: 27,
        reload_time: 2,
        attack_delay: 0.35,
        movement_rate: 0.96,
        line_of_sight: 7,
        hit_points: 35,
        range: 5,
        attack: 5,
        armor: '0/0',
        attack_bonus: ['+3 spearmen'],
        accuracy: '85%',
      },
      {
        id: 3,
        name: 'Arbalest',
        description: 'Upgraded crossbowman',
        expansion: 'Age of Kings',
        age: 'Imperial',
        cost: {
          Wood: 25,
          Gold: 45,
        },
        build_time: 27,
        reload_time: 2,
        attack_delay: 0.35,
        movement_rate: 0.96,
        line_of_sight: 7,
        hit_points: 40,
        range: 5,
        attack: 6,
        armor: '0/0',
        attack_bonus: ['+3 spearmen'],
        accuracy: '90%',
      },
    ],
    filters: {
      age: 'Castle',
      wood: { min: 50, max: 100 },
      gold: { min: 100, max: 200 },
      food: { min: 0, max: 200 },
    },
  };

  it('should select all units', () => {
    const result = selectAllUnits.projector(initialState);
    expect(result.length).toEqual(3);
    expect(result[0].id).toEqual(1);
  });

  it('should select filters', () => {
    const result = selectFilter.projector(initialState);
    expect(result.age).toEqual('Castle');
    expect(result.wood.min).toEqual(50);
    expect(result.wood.max).toEqual(100);
    expect(result.food.min).toEqual(0);
    expect(result.food.max).toEqual(200);
    expect(result.gold.min).toEqual(100);
    expect(result.gold.max).toEqual(200);
  });

  it('should select filtered units based on filters', () => {
    let result = selectFilteredUnits.projector(initialState.units, initialState.filters);
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(initialState.units[1].id);
    result = selectFilteredUnits.projector(initialState.units, {
      age: 'Imperial',
      wood: null,
      gold: null,
      food: null,
    });
    expect(result.length).toEqual(1);
    expect(result[0].id).toEqual(initialState.units[2].id);
    result = selectFilteredUnits.projector(initialState.units, null);
    expect(result.length).toEqual(3);
    result = selectFilteredUnits.projector(initialState.units, null);
    expect(result.length).toEqual(3);
    result = selectFilteredUnits.projector(initialState.units, {
      age: 'All',
      wood: { min: 250, max: 350 },
      gold: null,
      food: null,
    });
    expect(result.length).toEqual(0);
    result = selectFilteredUnits.projector(initialState.units, {
      age: 'All',
      wood: null,
      gold: { min: 250, max: 350 },
      food: null,
    });
    expect(result.length).toEqual(0);
    result = selectFilteredUnits.projector(initialState.units, {
      age: 'All',
      wood: null,
      gold: null,
      food: { min: 250, max: 350 },
    });
    expect(result.length).toEqual(0);
  });

  it('should select a unit by id', () => {
    let result = selectUnit(3).projector(initialState.units);
    expect(result.id).toEqual(initialState.units[2].id);
    result = selectUnit(4).projector(initialState.units);
    expect(result).toBeNull();
  });
});
