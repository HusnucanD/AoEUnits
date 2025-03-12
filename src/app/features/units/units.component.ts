import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'aoe-units',
  imports: [RouterOutlet],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsComponent {}
