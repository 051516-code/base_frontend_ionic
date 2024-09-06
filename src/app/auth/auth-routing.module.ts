import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


//TODO: own Imports
import { AUTH_ROUTES } from './auth-routing.constant';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';
import { RecoverPassComponent } from './components/recover-pass/recover-pass.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
const routes: Routes = [

  {
    path: '',
    redirectTo: AUTH_ROUTES.LOGIN,
    pathMatch : 'full',
  },
  {
    path : AUTH_ROUTES.LOGIN,
    component: LoginComponent
  },
  {
    path : AUTH_ROUTES.REGISTER,
    component: RegisterComponent
  },
  {
    path : AUTH_ROUTES.TERMS,
    component: TermsConditionComponent
  },
  {
    path : AUTH_ROUTES.RECOVERPASS,
    component: RecoverPassComponent
  },
  {
    path : AUTH_ROUTES.VERIFYCODE,
    component: VerifyCodeComponent
  },
  {
    path : AUTH_ROUTES.RESSETPASS,
    component: ResetPassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
