import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, of, switchMap } from 'rxjs';
import { UnitsState } from '../../reducers/units.reducer';
import { selectUnit } from '../../selectors/units.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'aoe-units-details',
  imports: [CommonModule],
  templateUrl: './units-details.component.html',
  styleUrl: './units-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsDetailsComponent {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  store = inject(Store<UnitsState>);
  unit = toSignal(
    this.activatedRoute.params.pipe(
      map((params: Params) => {
        if (!params['id'] || Number.isNaN(Number(params['id']))) {
          this.router.navigate(['/units']);
          return null;
        }
        return Number(params['id']);
      }),
      switchMap((id) => (id != null ? this.store.select(selectUnit(id)) : of(null)))
    ),
    { initialValue: null }
  );
  unitProperties = computed(() => {
    const unit = this.unit();
    if (unit) {
      return new Map<string, string | number>([
        ['ID', unit.id],
        ['Name', unit.name],
        ['Description', unit.description],
        ['Min. Required Age', unit.age],
        ['Wood Cost', unit.cost?.Wood ?? '-'],
        ['Food Cost', unit.cost?.Food ?? '-'],
        ['Gold Cost', unit.cost?.Gold ?? '-'],
        ['Build Time', unit.build_time ?? '-'],
        ['Reload Time', unit.reload_time ?? '-'],
        ['Hit Points', unit.hit_points],
        ['Attack', unit.attack ?? '-'],
        ['Accuracy', unit.accuracy ?? '-'],
      ]);
    }
    return null;
  });
}
