import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GrilleComponent } from "./grille/grille.component";
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GrilleComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'demineur';
}
