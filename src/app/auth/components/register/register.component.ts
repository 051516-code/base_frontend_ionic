import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { APP_ROUTES } from '../../../app-routes.constant';
import { AUTH_ROUTES } from '../../auth-routing.constant';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.registerForm.reset()
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.valid) {

      // TODO> Preparamos los datos sin 'confirmPassword' y 'terms'
      const registerData = {
        name: this.registerForm.get('name')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };
      
      //TODO: mostramos el indicador de carga
        this.isLoading = true;

      // TODO>Llama al servicio de registro
      try {

        this.authService.register(registerData).subscribe(

          (response) => {
            console.log('Respuesta del backend:' , response)
  
            if (response.success) {
  
              this.toastService.showSuccessToast('Registro completado con éxito!!!');
              this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.LOGIN}`]);
  
            } else {
  
              console.log('Error en la respuesta :' , response)
              this.toastService.showDangerToast(response.message || 'Error al registrar el usuario!!!');
            }
          },
          (error) => {
            this.toastService.showDangerToast('Error al registrar el usuario!!!');
          }
        );
        
      } catch (error) {

        this.toastService.showDangerToast('Error al registrar, por favor intente nuevamente : ' + error);

      } finally {

         this.isLoading = false; //TODO:  oculta el indicador de carga
      }
      
    }
  }
  
  
  

  goToLogin() {
    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.LOGIN}`]);
  }

  goToTerms() {
    // Aquí puedes redirigir a una página de términos y condiciones, por ejemplo:
    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.TERMS}`]);
  }
}
