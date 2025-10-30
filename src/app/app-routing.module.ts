import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ViewLayoutComponent } from './layout/view-layout/view-layout.component';

const routes: Routes = [

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./auth/pages/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./auth/pages/register/register.module').then(a => a.RegisterModule)
      },
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./board/board.module').then(a => a.BoardModule)
      },
      {
        path: 'cap-nhat-thong-tin',
        loadChildren: () => import('./components/update-info/update-info.module').then(a => a.UpdateInfoModule)
      },
    ]
  },
  { 
    path:'bang',
    component : ViewLayoutComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:':id',
        loadChildren: ()=> import('./jobs/job.module').then(a => a.JobModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
