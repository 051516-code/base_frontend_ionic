import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPassComponent } from './components/recover-pass/recover-pass.component';
import { SharedModule } from '../shared/shared.module';
import { RequestEmailComponent } from './components/recover-pass/request-email/request-email.component';
import { VerifyCodeComponent } from './components/recover-pass/verify-code/verify-code.component';
import { ResetPassComponent } from './components/recover-pass/reset-pass/reset-pass.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverPassComponent,
    RequestEmailComponent,
    VerifyCodeComponent,
    ResetPassComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,

    SharedModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
