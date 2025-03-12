import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { UnitsDetailsComponent } from './units-details.component';
import { UnitsState } from '../../reducers/units.reducer';

describe('UnitsDetailsComponent', () => {
  let component: UnitsDetailsComponent;
  let fixture: ComponentFixture<UnitsDetailsComponent>;
  let mockStore: jasmine.SpyObj<Store<UnitsState>>;
  let mockRouter: jasmine.SpyObj<Router>;
  const paramsSubject = new BehaviorSubject<Params>({ id: 1 });
  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockStore.select.and.returnValue(of(null));
    await TestBed.configureTestingModule({
      imports: [UnitsDetailsComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: { params: paramsSubject },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(UnitsDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate unitProperties with correct values from the store', () => {
    mockStore.select.and.returnValue(
      of({
        id: 1,
        name: 'Archer',
        description: 'Quick and light. Weak at close range; excels at battle from distance',
        age: 'Feudal',
        cost: { Wood: 25, Gold: 45 },
        build_time: 35,
        reload_time: 2,
        hit_points: 4,
        attack: 4,
        accuracy: '80%',
      })
    );
    paramsSubject.next({ id: 1 });
    fixture.detectChanges();
    expect(component.unitProperties().get('ID')).toBe(1);
    expect(component.unitProperties().get('Name')).toBe('Archer');
    expect(component.unitProperties().get('Description')).toBe(
      'Quick and light. Weak at close range; excels at battle from distance'
    );
    expect(component.unitProperties().get('Min. Required Age')).toBe('Feudal');
    expect(component.unitProperties().get('Wood Cost')).toBe(25);
    expect(component.unitProperties().get('Food Cost')).toBe('-');
    expect(component.unitProperties().get('Gold Cost')).toBe(45);
    expect(component.unitProperties().get('Build Time')).toBe(35);
    expect(component.unitProperties().get('Reload Time')).toBe(2);
    expect(component.unitProperties().get('Hit Points')).toBe(4);
    expect(component.unitProperties().get('Attack')).toBe(4);
    expect(component.unitProperties().get('Accuracy')).toBe('80%');
    mockStore.select.and.returnValue(
      of({
        id: 1,
        name: 'Archer',
        description: 'Quick and light. Weak at close range; excels at battle from distance',
        age: 'Feudal',
        cost: { Food: 25 },
        hit_points: 4,
      })
    );
    paramsSubject.next({ id: 1 });
    fixture.detectChanges();
    expect(component.unitProperties().get('Wood Cost')).toBe('-');
    expect(component.unitProperties().get('Food Cost')).toBe(25);
    expect(component.unitProperties().get('Gold Cost')).toBe('-');
    expect(component.unitProperties().get('Build Time')).toBe('-');
    expect(component.unitProperties().get('Reload Time')).toBe('-');
    expect(component.unitProperties().get('Attack')).toBe('-');
    expect(component.unitProperties().get('Accuracy')).toBe('-');
  });

  it('should navigate to "/units" if the id is not found', () => {
    paramsSubject.next({});
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/units']);
  });

  it('should navigate to "/units" if the unit is not found', () => {
    mockStore.select.and.returnValue(of(null));
    paramsSubject.next({});
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/units']);
  });

  it('should render unit properties correctly', () => {
    mockStore.select.and.returnValue(
      of({
        id: 1,
        name: 'Archer',
        description: 'Quick and light. Weak at close range; excels at battle from distance',
        age: 'Feudal',
        cost: { Wood: 25, Gold: 45 },
        build_time: 35,
        reload_time: 2,
        hit_points: 4,
        attack: 4,
        accuracy: '80%',
      })
    );
    paramsSubject.next({ id: 1 });
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('.unit-details__row');
    expect(rows.length).toBe(component.unitProperties().size);
    component.unitProperties().forEach((value, key) => {
      const labelElements = fixture.nativeElement.querySelectorAll('.unit-details__label p');
      const labelElement = Array.from(labelElements).find(
        (el) => (el as HTMLElement).textContent.trim() === `${key}:`
      );
      expect(labelElement).toBeTruthy();
      const rowElement = (labelElement as HTMLElement).closest('.unit-details__row');
      const valueElement = rowElement.querySelector('.unit-details__value p');
      expect(valueElement).toBeTruthy();
      expect(valueElement.textContent.trim()).toBe(value.toString());
    });
  });
});
