import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateInfoComponent } from './update-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

const routers: Routes = [
  {
    path: '',
    component: UpdateInfoComponent
  }
]
@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule.forChild(routers),
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
  ],
  declarations: [UpdateInfoComponent]
})
export class UpdateInfoModule { }
