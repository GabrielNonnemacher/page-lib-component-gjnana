import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CompGjnanaButtonComponent} from 'lib-mat-gjnana'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CompGjnanaButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'page-lib-component-gjnana';
}
