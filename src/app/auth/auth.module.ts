import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPassComponent } from './components/recover-pass/recover-pass.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoverPassComponent,
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
