import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AoeButtonsGroupComponent } from '../../../../shared/components/aoe-buttons-group/aoe-buttons-group.component';
import { AoeRangeSliderComponent } from '../../../../shared/components/aoe-range-slider/aoe-range-slider.component';
import { AoeCheckboxComponent } from '../../../../shared/components/aoe-checkbox/aoe-checkbox.component';
import { AoeTableComponent } from '../../../../shared/components/aoe-table/aoe-table.component';
import { UnitsState } from '../../reducers/units.reducer';
import { selectFilteredUnits } from '../../selectors/units.selectors';
import { setFilter } from '../../actions/units.actions';
import { Unit } from '../../models/units.model';

@Component({
  selector: 'aoe-units-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AoeButtonsGroupComponent,
    AoeRangeSliderComponent,
    AoeCheckboxComponent,
    AoeTableComponent,
  ],
  templateUrl: './units-list.component.html',
  styleUrl: './units-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsListComponent implements OnDestroy {
  store: Store<UnitsState> = inject(Store);
  router = inject(Router);
  units = toSignal(this.store.select(selectFilteredUnits), {
    initialValue: [],
  });
  filterForm = new FormGroup({
    age: new FormControl('All', [Validators.required]),
    filterWood: new FormControl(false),
    wood: new FormControl({ value: [0, 200], disabled: true }),
    filterFood: new FormControl(false),
    food: new FormControl({ value: [0, 200], disabled: true }),
    filterGold: new FormControl(false),
    gold: new FormControl({ value: [0, 200], disabled: true }),
  });
  filterFormChange = this.filterForm.valueChanges.subscribe((values) => {
    if (this.filterForm.get('filterWood').value) {
      this.filterForm.get('wood').enable({ emitEvent: false });
    } else {
      this.filterForm.get('wood').disable({ emitEvent: false });
    }
    if (this.filterForm.get('filterFood').value) {
      this.filterForm.get('food').enable({ emitEvent: false });
    } else {
      this.filterForm.get('food').disable({ emitEvent: false });
    }
    if (this.filterForm.get('filterGold').value) {
      this.filterForm.get('gold').enable({ emitEvent: false });
    } else {
      this.filterForm.get('gold').disable({ emitEvent: false });
    }
    const wood = this.filterForm.get('wood').value;
    const food = this.filterForm.get('food').value;
    const gold = this.filterForm.get('gold').value;
    this.store.dispatch(
      setFilter({
        filters: {
          age: values.age,
          wood: wood != null && values.filterWood ? { min: wood[0], max: wood[1] } : null,
          food: food != null && values.filterFood ? { min: food[0], max: food[1] } : null,
          gold: gold != null && values.filterGold ? { min: gold[0], max: gold[1] } : null,
        },
      })
    );
  });
  onClickUnit(unit: Unit) {
    this.router.navigate(['/units/details', unit.id]);
  }
  ngOnDestroy() {
    this.filterFormChange?.unsubscribe();
  }
}
