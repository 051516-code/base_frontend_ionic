
import { Component } from '@angular/core';
import { FormGroup, Validator, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//TODO: own Imports
import { AuthService } from '../../services/authFake.services';
import { ToastService } from '../../../core/services/toast.service';
import { Login } from '../../interfaces/login.interface';
import { AUTH_ROUTES } from '../../auth-routing.constant';
import { APP_ROUTES } from 'src/app/app-routes.constant';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{

  loginForm : FormGroup;
  isLoading = false;

  constructor(
    private formBuilder : FormBuilder,
    private authService : AuthService,
    private router : Router,
    private toastService : ToastService
  ) { 
    // TODO: Inicializamos el login form 
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue]
    })
  }


  //TODO> Acceso conveniente para los campos del formulario
  get form() { 
    return this.loginForm.controls;
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
 
    const login : Login = this.loginForm.value;

    try {
      const loggedIn = await this.authService.login(login);
     

      if (loggedIn) {
        this.toastService.showSuccessToast('Login Correcto')

        // this.router.navigate([`${AppRoutes.MAP}`]);
        
      } else {
        this.toastService.showDangerToast('Login Incorrecto revisa tus credenciales')
      }

    } catch (error) {
      this.toastService.showDangerToast('Login Incorrecto revisa tus credenciales')
      console.error('Error en el login:', error);
      // Manejar errores de autenticación aquí
    }
  }

  goToRegister(){
    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.REGISTER}`]);
  }

  goToForgot(){
    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.RECOVERPASS}`]);
  }


}
