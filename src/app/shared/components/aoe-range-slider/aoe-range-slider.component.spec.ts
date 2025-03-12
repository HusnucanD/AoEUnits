import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderChangeEvent } from 'primeng/slider';
import { AoeRangeSliderComponent } from './aoe-range-slider.component';

describe('AoeRangeSliderComponent', () => {
  let component: AoeRangeSliderComponent;
  let fixture: ComponentFixture<AoeRangeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AoeRangeSliderComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AoeRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.min()).toEqual(0);
    expect(component.max()).toEqual(100);
    expect(component.value).toEqual([0, 100]);
    expect(component.disabled).toBeFalsy();
  });

  it('should update value on writeValue', () => {
    const newValue = [20, 80];
    component.writeValue(newValue);
    expect(component.value).toEqual(newValue);
  });

  it('should call onChange with correct values on slider change', () => {
    const spy = spyOn(component, 'onChange');
    const event: SliderChangeEvent = {
      values: [30, 70],
      event: undefined,
    };
    component.onChangeValue(event);
    expect(spy).toHaveBeenCalledWith([30, 70]);
  });
});
