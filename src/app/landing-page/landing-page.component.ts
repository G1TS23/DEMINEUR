import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {



  constructor(private router: Router){
  }

chooseDificulty(mines: number) {
  this.router.navigateByUrl(`grid/${mines}`);
}

}
