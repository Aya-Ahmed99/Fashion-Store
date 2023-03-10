import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/components/account/login/login.component';
import { AuthGaurdLoggedService } from '../authentication-guard/auth-gaurd-logged.service';
import { RegisterComponent } from 'src/app/components/account/register/register.component';
import { EditComponent } from 'src/app/components/account/edit/edit.component';
import { AuthGaurdUserService } from '../authentication-guard/auth-gaurd-user.service';
import { HttpClient } from '@angular/common/http';
const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    canActivate: [AuthGaurdLoggedService],
    data: { breadcrumb: { data: 'login' } },
  },
  {
    path: 'login',
    canActivate: [AuthGaurdLoggedService],
    component: LoginComponent,

    data: { breadcrumb: { data: 'login' } },
  },
  {
    path: 'register',
    canActivate: [AuthGaurdLoggedService],
    component: RegisterComponent,
    data: { breadcrumb: { data: 'register' } },
  },
  {
    path: 'update/:id',
    component: EditComponent,
    canActivate: [AuthGaurdUserService],
    pathMatch: 'full',
    data: { breadcrumb: { alias: 'updateUser' } },
  },
];

@NgModule({
  declarations: [],

  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
