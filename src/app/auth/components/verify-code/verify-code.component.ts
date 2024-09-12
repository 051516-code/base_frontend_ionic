import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { AuthService } from '../../services/auth.service';
import { AUTH_ROUTES } from '../../auth-routing.constant';
import { APP_ROUTES } from 'src/app/app-routes.constant';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent {
  verifyForm: FormGroup;
  controls: number[] = [0, 1, 2, 3]; // Asegúrate de que estos índices coincidan con el FormGroup

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private toastService: ToastService

  ) { 
    this.verifyForm = this.fb.group({
      0: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
    });
  }

  onInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    // Remove non-numeric characters
    if (!/^[0-9]*$/.test(value)) {
      this.toastService.showDangerToast('El codigo no deberia tener letras')
      input.value = value.replace(/\D/g, '');
    }
  }

  async onVerifySubmit() {
    if (this.verifyForm.valid) {
      const code = this.verifyForm.value; // Get the full form value as an object
      const codeStr = Object.values(code).join(''); // Convert form values to a single string
  

      try {
        const isValid = await this.authService.verifyCode(codeStr);
     
        if(isValid) {
        await this.toastService.showSuccessToast('Código verificado con éxito.');
        this.verifyForm.reset();
        setTimeout(() => {
          // this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.RESSETPASS}`]);
        },2500)

        }else {
          this.verifyForm.reset();
          await this.toastService.showDangerToast('Código incorrecto. Inténtalo de nuevo.');
        }
      } catch (error) {
        await this.toastService.showDangerToast('Error al verificar el codigo' + error)
      }
    }else {
      await this.toastService.showDangerToast('Por favor, completa el código de verificación.')
    }
  }
}
