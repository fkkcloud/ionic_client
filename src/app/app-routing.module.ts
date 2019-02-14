import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './login/login.module#LoginPageModule'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'createcompany', loadChildren: './createcompany/createcompany.module#CreatecompanyPageModule' },
  { path: 'leader', loadChildren: './leader/leader.module#LeaderPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
