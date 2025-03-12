import { Routes } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { UnitsComponent } from './units.component';
import { UnitsDetailsComponent } from './components/units-details/units-details.component';
import { UnitsListComponent } from './components/units-list/units-list.component';
import { unitsReducer } from './reducers/units.reducer';

export const UNITS_ROUTES: Routes = [
  {
    path: '',
    component: UnitsComponent,
    children: [
      {
        path: '',
        component: UnitsListComponent,
      },
      {
        path: 'details/:id',
        component: UnitsDetailsComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
    providers: [provideStore({ units: unitsReducer })],
  },
];
