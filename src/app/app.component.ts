import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AoeNavigationBarComponent } from './shared/components/aoe-navigation-bar/aoe-navigation-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AoeNavigationBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
