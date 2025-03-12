import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoeTableComponent } from './aoe-table.component';

describe('AoeTableComponent', () => {
  let component: AoeTableComponent;
  let fixture: ComponentFixture<AoeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AoeTableComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AoeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
