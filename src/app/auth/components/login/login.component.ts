import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Importaciones propias
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { AUTH_ROUTES } from '../../auth-routing.constant';
import { APP_ROUTES } from 'src/app/app-routes.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    // Inicializamos el formulario de login
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Acceso conveniente para los campos del formulario
  get form() {
    return this.loginForm.controls;
  }



  async onSubmit() {
    if (this.loginForm.valid) {

      //TODO> preparamos los datos a enviar
      const loginData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.isLoading = true; // Mostrar indicador de carga
      
      //TODO> llamamos el servicio de login
      try {
        const result = await this.authService.login(loginData).toPromise();
      
        console.log(result?.token)
        if (result && result.token) {  // Verificar si el login fue exitoso y si se recibe el token
          this.toastService.showSuccessToast('Login Correcto');
          this.router.navigate([APP_ROUTES.MAP]); // Redirigir a la ruta deseada
        
        }else {
          
          this.toastService.showDangerToast('Login Incorrecto, revisa tus credenciales: '+ result);
        }
      
      } catch (error) {
       
        this.toastService.showDangerToast('Error en el login, por favor intente nuevamente : ' + error);
     
      } finally {
      
        this.isLoading = false; // Ocultar indicador de carga
      }
    }

  }




  goToRegister() {
    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.REGISTER}`]);
  }

  goToForgot() {
    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.RECOVERPASS}`]);
  }
}
