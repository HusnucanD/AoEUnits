import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AoeCheckboxComponent } from './aoe-checkbox.component';

describe('AoeCheckboxComponent', () => {
  let component: AoeCheckboxComponent;
  let fixture: ComponentFixture<AoeCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AoeCheckboxComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AoeCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default value as false', () => {
    expect(component.value).toBeFalse();
  });

  it('should write value correctly', () => {
    component.writeValue(true);
    fixture.detectChanges();
    expect(component.value).toBeTrue();
    component.writeValue(false);
    fixture.detectChanges();
    expect(component.value).toBeFalse();
  });
});
