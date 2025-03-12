import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'aoe-navigation-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './aoe-navigation-bar.component.html',
  styleUrl: './aoe-navigation-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AoeNavigationBarComponent {}
