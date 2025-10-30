import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board.component';
import { FormsModule } from '@angular/forms';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { SearchUserComponent } from '../components/search-user/search-user.component';
import { CdkDragPlaceholder } from "@angular/cdk/drag-drop";
import { ButtonModule } from 'primeng/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../core/loading.interceptor';

const routers: Routes = [
  { path: "", component: BoardComponent }
]

@NgModule({
  declarations: [BoardComponent, AddUserComponent, SearchUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routers),
    FormsModule,
    CdkDragPlaceholder,
    ButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
})
export class BoardModule { }
