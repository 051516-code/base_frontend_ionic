import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/authFake.services';
import { ToastService } from '../../../core/services/toast.service';
import { APP_ROUTES } from 'src/app/app-routes.constant';
import { AUTH_ROUTES } from '../../auth-routing.constant';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss'],
})
export class RecoverPassComponent {

  requestForm : FormGroup;

  constructor(
    private fb : FormBuilder,
    private authService: AuthService,
    private router : Router,
    private toastService : ToastService
  ) { 
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  async onRequestSubmit(){
    if(this.requestForm.valid){
      const email = this.requestForm.get('email')?.value;
  
      try{
  
        const emailValid = await this.authService.recoverPassword(email);
        
        if(emailValid) {
          await this.toastService.showSuccessToast('Codigo enviado al correo electronico');
          this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.VERIFYCODE}`]);
    
        }else {
          await this.toastService.showDangerToast('Email invalido!!');
        }
        
      }catch(error){
        await this.toastService.showDangerToast('Error al enviar el codigo a tu correo ')
      }
    }
  }
 

}
