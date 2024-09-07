import { Routes } from '@angular/router';
import { GrilleComponent } from './grille/grille.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
    {path: 'grid/:id', component: GrilleComponent },
    {path: '', component: LandingPageComponent}
];
