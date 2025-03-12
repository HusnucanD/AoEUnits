import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AoeButtonsGroupComponent } from './aoe-buttons-group.component';

describe('AoeButtonsGroupComponent', () => {
  let component: AoeButtonsGroupComponent;
  let fixture: ComponentFixture<AoeButtonsGroupComponent>;
  let componentRef: ComponentRef<AoeButtonsGroupComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AoeButtonsGroupComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AoeButtonsGroupComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of buttons based on options', () => {
    componentRef.setInput('options', ['Option 1', 'Option 2', 'Option 3']);
    fixture.detectChanges();
    const buttons = element.queryAll(By.css('.aoe-buttons-group__button'));
    expect(buttons.length).toBe(3);
  });

  it('should update selected value on button click', () => {
    componentRef.setInput('options', ['Option 1', 'Option 2', 'Option 3']);
    fixture.detectChanges();
    const button = element.queryAll(By.css('.aoe-buttons-group__button'))[1];
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.value).toBe('Option 2');
  });

  it('should not update value when disabled', () => {
    componentRef.setInput('options', ['Option 1', 'Option 2', 'Option 3']);
    component.setDisabledState(true);
    fixture.detectChanges();
    const button = element.queryAll(By.css('.aoe-buttons-group__button'))[0];
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.value).toBeNull();
  });
});
