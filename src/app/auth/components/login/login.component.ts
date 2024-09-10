import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Importaciones propias
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { Login } from '../../interfaces/login.interface';
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
    if (this.loginForm.invalid) {
      return;
    }

    const login: Login = this.loginForm.value;

    this.isLoading = true; // Mostrar indicador de carga
    try {
      const loggedIn = await this.authService.login(login).toPromise();
      
      console.log('Login result:', loggedIn);

      if (loggedIn) {
        this.toastService.showSuccessToast('Login Correcto');
        this.router.navigate([APP_ROUTES.HOME]); // Redirigir a la ruta deseada
      } else {

        this.toastService.showDangerToast('Login Incorrecto, revisa tus credenciales: '+ loggedIn);
      }
    } catch (error) {
      this.toastService.showDangerToast('Error en el login, por favor intente nuevamente : ' + error);
    } finally {
      this.isLoading = false; // Ocultar indicador de carga
    }
  }

  goToRegister() {
    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.REGISTER}`]);
  }

  goToForgot() {
    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.RECOVERPASS}`]);
  }
}
