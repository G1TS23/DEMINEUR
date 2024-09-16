import { CommonModule, NgFor } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Box } from '../models/Box.model';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(private activeRoute: ActivatedRoute,
              private router: Router
  ){}

  @HostListener('contextmenu')
    preventContextMenu() {
    return false;
}

  grid!: Box[];
  mines!: number[];
  nbMines!: number;
  nbBox!: number;
  isLost!: boolean;
  isWin!: boolean;
  rows!: number;
  columns!: number;
  nbFlag!: number;
  colors!: string[];
  flagMode!: boolean;

  ngOnInit(): void {
    
    const id = +this.activeRoute.snapshot.params['id'];
    this.rows = 10;
    this.columns = 10;
    this.nbBox = this.rows * this.columns;
    this.nbMines = id;
    this.mines = this.setMines();
    this.isLost = false;
    this.isWin = false;
    this.nbFlag = 0;
    this.flagMode = false;
    this.prepareGrid();
    this.setNeighboors();
    this.setColors();

  }

  setColors():void{
    this.colors = [
      'black',
      'darkgreen',
      'red',
      'orange',
      'yellow',
      'purple',
      'pink',
      'white',
      'darkmagenta'
    ];
  }

  setMines(): number[]{
    const mines: number[] = [];

    for(let i = 0; i<this.nbMines; i++){
      let rng = Math.round(Math.random() * this.nbBox);
      while(mines.find( item => item === rng)){
        rng = Math.round(Math.random() * this.nbBox);
      }
        mines.push(rng);
    }
    return mines;
  }

  prepareGrid(): void{

    this.grid = [];

    for(let i = 0; i < this.nbBox; i++){

      this.grid.push({
        id: i,
        isMined: (this.mines.find(item => item === i) ? true : false),
        isClicked: false,
        isFlag: false,
        nbNeighboors: 0
      });
    }
  } 
  setNeighboors(): void{
    for(let i = 0; i < this.nbBox; i++){
      if(!this.mines.find(item => item === i)){ //si ça n'est pas une mine je regarde le nombre de mine voisine
        if(!this.isLast(i) && this.grid[i+1].isMined){
          this.grid[i].nbNeighboors++;
        }
        if(!this.isFirst(i) && this.grid[i-1].isMined){
          this.grid[i].nbNeighboors++;
        }
        if(!this.isBottom(i) && this.grid[i+10].isMined){
          this.grid[i].nbNeighboors++;
        }
        if(!this.isTop(i) && this.grid[i-10].isMined){
          this.grid[i].nbNeighboors++;
        }
        if(!this.isFirst(i) && !this.isTop(i) && this.grid[i-11].isMined){
          this.grid[i].nbNeighboors++;
        }
        if(!this.isLast(i) && !this.isTop(i) && this.grid[i-9].isMined){
          this.grid[i].nbNeighboors++;
        }
        if(!this.isLast(i) && !this.isBottom(i) && this.grid[i+11].isMined){
          this.grid[i].nbNeighboors++;
        }
        if(!this.isBottom(i) && !this.isFirst(i) && this.grid[i+9].isMined){
          this.grid[i].nbNeighboors++;
        }
      }
    }
  }

  checkBox(id: number): void{
    if(this.grid[id].nbNeighboors === 0){
      this.grid[id].isClicked = true;
    }
  }

  isEven(boxId: number): boolean{
    return boxId % 2 === 0;
  }

  isRowEven(boxId: number): boolean{
    const isEven: boolean = Math.floor(boxId / this.rows) % 2 === 0;
    return isEven;
  }

  //retourne vrai si la case est dans la permière ligne, sinon faux
  isTop(boxId: number): boolean{
    return (boxId < this.columns ? true : false);
  }
  //retourne vrai si la case est la dernière de la ligne, sinon faux
  isLast(boxId: number): boolean{
    return ( (boxId % this.columns) === (this.columns -1) ? true : false);
  }
  //retourne vrai si la case est la première de la ligne, sinon faux
  isFirst(boxId: number): boolean{
    return ( (boxId % this.columns) === 0 ? true : false);
  }
  //retourne vrai si la case est dans la dernière ligne, sinon faux
  isBottom(boxId: number): boolean{
    return (boxId >= (this.columns * (this.rows -1)) ? true : false);
  }




//fait apparaitre la case au dessus à gauche
  showUpLeft(boxId: number): void{
    if(!this.grid[boxId - 11].isClicked){
      this.grid[boxId - 11].isClicked = true;
      this.grid[boxId - 11].isFlag = false;
      this.showNeighboors(boxId - 11);
    }
  }
//fait apparaitre la case au dessus
  showUp(boxId: number):void{
    if(!this.grid[boxId - 10].isClicked){
      this.grid[boxId - 10].isClicked = true;
      this.grid[boxId - 10].isFlag = false;
      this.showNeighboors(boxId - 10);
    }
  }
//fait apparaitre la case au dessus à droite
  showUpRight(boxId: number):void{
    if(!this.grid[boxId - 9].isClicked){
      this.grid[boxId - 9].isClicked = true;
      this.grid[boxId - 9].isFlag = false;
    this.showNeighboors(boxId - 9);
    }
  }
//fait apparaitre la case à droite
  showRight(boxId: number):void{
    if(!this.grid[boxId + 1].isClicked){
      this.grid[boxId + 1].isClicked = true;
      this.grid[boxId + 1].isFlag = false;
      this.showNeighboors(boxId + 1);
    }
  }
//fait apparaitre la case en dessous à droite
  showDownRight(boxId: number):void{
    if(!this.grid[boxId + 11].isClicked){
      this.grid[boxId + 11].isClicked = true;
      this.grid[boxId + 11].isFlag = false;
      this.showNeighboors(boxId + 11);
    }
  }
//fait apparaitre la case en dessous
  showDown(boxId: number):void{
    if(!this.grid[boxId + 10].isClicked){
      this.grid[boxId + 10].isClicked = true;
      this.grid[boxId + 10].isFlag = false;
      this.showNeighboors(boxId + 10);
    }
  }
//fait apparaitre la case en dessous à gauche
  showDownLeft(boxId: number):void{
    if(!this.grid[boxId + 9].isClicked){
      this.grid[boxId + 9].isClicked = true;
      this.grid[boxId + 9].isFlag = false;
      this.showNeighboors(boxId + 9);
    }
  }
//fait apparaitre la case à gauche
  showLeft(boxId: number):void{
    if(!this.grid[boxId - 1].isClicked){
      this.grid[boxId - 1].isClicked = true;
      this.grid[boxId - 1].isFlag = false;
      this.showNeighboors(boxId - 1);
    }
  }

  showAllAround(boxId: number): void{
    this.showUpLeft(boxId);
    this.showUp(boxId);
    this.showUpRight(boxId);
    this.showRight(boxId);
    this.showDownRight(boxId);
    this.showDown(boxId);
    this.showDownLeft(boxId);
    this.showLeft(boxId);
  }

  showNeighboors(boxId: number): void{

    if (this.grid[boxId].nbNeighboors === 0 ){
      if (this.isFirst(boxId) && !this.isBottom(boxId)){
        this.showRight(boxId);
        this.showDownRight(boxId);
        this.showDown(boxId);
        if (!this.isTop(boxId)){
          this.showUp(boxId);
          this.showUpRight(boxId);
        }
      }else if (this.isBottom(boxId) && !this.isLast(boxId)){
        this.showUp(boxId);
        this.showUpRight(boxId);
        this.showRight(boxId);
        if (!this.isFirst(boxId)){
          this.showLeft(boxId);
          this.showUpLeft(boxId);
        }
      }else if (this.isLast(boxId) && !this.isTop(boxId)){
        this.showLeft(boxId);
        this.showUpLeft(boxId);
        this.showUp(boxId);
        if (!this.isBottom(boxId)){
          this.showDown(boxId);
          this.showDownLeft(boxId);
        }
      }else if (this.isTop(boxId) && !this.isFirst(boxId)){
        this.showDown(boxId);
        this.showDownLeft(boxId);
        this.showLeft(boxId);
        if (!this.isLast(boxId)){
          this.showRight(boxId);
          this.showDownRight(boxId);
        }
      }else this.showAllAround(boxId);
  }
}


  onClick(boxId: number): void{
        if(this.flagMode){
          this.onRightClick(boxId);
          return;
        }
      
        if(this.grid[boxId].isMined){
          this.isLost = true;
          this.grid[boxId].isClicked = true;
          return ;
        } 
        this.grid[boxId].isFlag = false;
        this.nbFlag = this.grid.filter(box => box.isFlag).length;
        this.grid[boxId].isClicked = true;
        this.showNeighboors(boxId);

        const boxCliked: number = this.grid.filter(box => box.isClicked).length;
        
        if (boxCliked === this.nbBox - this.nbMines){
          this.isWin = true;
        }
     
  }

  onRightClick(boxId: number): void{
    if(!this.grid[boxId].isClicked && !this.isWin && this.nbFlag < this.nbMines){
    this.grid[boxId].isFlag =  !this.grid[boxId].isFlag;
    this.nbFlag = this.grid.filter(box => box.isFlag).length;
    }
  }

  toggleFlagMode(): void{
    this.flagMode = !this.flagMode;
  }

  resetGame(): void{
    this.mines = this.setMines();
    this.prepareGrid();
    this.setNeighboors();
    this.isLost = false;
    this.isWin = false;
    this.nbFlag = 0;
    this.flagMode = false;
  }

  goToMenu(){
    this.router.navigateByUrl('');
  }

}
