import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AoeNavigationBarComponent } from './aoe-navigation-bar.component';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../../app.routes';

describe('AoeNavigationBarComponent', () => {
  let component: AoeNavigationBarComponent;
  let fixture: ComponentFixture<AoeNavigationBarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AoeNavigationBarComponent],
      providers: [provideRouter([...routes])],
    }).compileComponents();
    fixture = TestBed.createComponent(AoeNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply active class to links', async () => {
    router = TestBed.inject(Router);
    await router.navigateByUrl('/home');
    fixture.detectChanges();
    const homeLink = fixture.nativeElement.querySelector('a[routerLink="/home"]') as HTMLElement;
    expect(homeLink.classList.contains('active')).toBe(true);
    await router.navigateByUrl('/units');
    fixture.detectChanges();
    const unitsLink = fixture.nativeElement.querySelector('a[routerLink="/units"]') as HTMLElement;
    expect(unitsLink.classList.contains('active')).toBe(true);
  });
});
