import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateInfoComponent } from './update-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
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
    MatNativeDateModule,
    AvatarModule,
    FileUploadModule,
    CalendarModule,
    FormsModule,
    InputTextModule,
    ToastModule,
    RippleModule,
  ],
  providers: [MessageService],
  declarations: [UpdateInfoComponent]
})
export class UpdateInfoModule { }
