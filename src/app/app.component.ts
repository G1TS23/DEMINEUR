import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

// GrilleComponent n'est pas importe ici : il est atteint par le routeur
// (app.routes.ts), pas place dans ce template. Angular 20 le signale (NG8113).
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demineur';
}
