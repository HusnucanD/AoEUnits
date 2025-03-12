import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UnitsListComponent } from './units-list.component';
import { setFilter } from '../../actions/units.actions';
import * as unitsReducer from '../../reducers/units.reducer';

describe('UnitsListComponent', () => {
  let component: UnitsListComponent;
  let fixture: ComponentFixture<UnitsListComponent>;
  let mockStore: jasmine.SpyObj<Store<unitsReducer.UnitsState>>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [UnitsListComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
    mockStore.select.and.returnValue(of(unitsReducer.initialState.units));
    fixture = TestBed.createComponent(UnitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.filterForm.getRawValue()).toEqual({
      age: 'All',
      filterWood: false,
      wood: [0, 200],
      filterFood: false,
      food: [0, 200],
      filterGold: false,
      gold: [0, 200],
    });
  });

  it('should render all units without filters', () => {
    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toEqual(unitsReducer.initialState.units.length + 1);
  });

  it('should update store when form values change', () => {
    component.filterForm.patchValue({
      age: 'Feudal',
      filterWood: true,
      wood: [50, 150],
    });
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      setFilter({
        filters: {
          age: 'Feudal',
          wood: { min: 50, max: 150 },
          food: null,
          gold: null,
        },
      })
    );
    component.filterForm.patchValue({
      age: 'Dark',
      filterWood: false,
      wood: null,
      filterFood: true,
      food: [50, 150],
      filterGold: true,
      gold: [75, 200],
    });
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      setFilter({
        filters: {
          age: 'Dark',
          food: { min: 50, max: 150 },
          wood: null,
          gold: { min: 75, max: 200 },
        },
      })
    );
  });

  it('should navigate to unit details on row click', () => {
    const rows = fixture.debugElement.queryAll(By.css('tr'));
    rows[1].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/units/details', 1]);
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = spyOn(component.filterFormChange, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
