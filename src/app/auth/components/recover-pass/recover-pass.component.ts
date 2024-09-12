import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { APP_ROUTES } from 'src/app/app-routes.constant';
import { AUTH_ROUTES } from '../../auth-routing.constant';
import { SendResetCode } from '../../interfaces/sendResetCode.interface';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss'],
})
export class RecoverPassComponent {
  isLoading = false;
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

  async onRequestSubmit() {
    if (this.requestForm.valid) {
  
      const email = this.requestForm.get('email')?.value;
  
      // Mostrar el indicador de carga
      this.isLoading = true;
  
      try {
        // Construir el objeto para la solicitud
        const sendResetCode: SendResetCode = { email };
  
        // Llamar al servicio para enviar el código de recuperación
        const response = await this.authService.sendResetCode(sendResetCode).toPromise();
  
        // Manejar la respuesta del servidor
        if (response.success) {
          console.log("Respuesta del servidor:", response);
          
          // Mostrar mensaje de éxito y redirigir
          await this.toastService.showSuccessToast('Código enviado al correo electrónico');
          this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.VERIFYCODE}`]);
          
        } else {
          // Mostrar mensaje de error en caso de fallo
          await this.toastService.showDangerToast('Email inválido o error al enviar el código.');
        }
  
      } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error en el envío del código:', error);
        await this.toastService.showDangerToast('Error al enviar el código a tu correo.');
        
      } finally {
        // Ocultar el indicador de carga
        this.isLoading = false;
      }
    } else {
      await this.toastService.showDangerToast('Por favor, ingresa una dirección de correo válida.');
    }
  }

}
