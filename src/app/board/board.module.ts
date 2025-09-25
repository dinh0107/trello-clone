import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board.component';

const routers: Routes = [
  { path: "", component: BoardComponent }
]

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routers)
  ]
})
export class BoardModule { }
