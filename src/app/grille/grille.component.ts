import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grille',
  standalone: true,
  imports: [
    CommonModule,
    NgFor
  ],
  templateUrl: './grille.component.html',
  styleUrl: './grille.component.scss'
})

export class GrilleComponent implements OnInit{

  grid!: number[];

  ngOnInit(): void {
    this.prepareGrid(100);
  }

  prepareGrid(nbCase: number): void{

    this.grid = [0];
    this.grid.push(1);
    this.grid.push(2);
    for(let i = 3; i++; i < nbCase){
      this.grid.push(i);
    }
  }

}
