import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { APP_ROUTES } from '../../../app-routes.constant';
import { AUTH_ROUTES } from '../../auth-routing.constant';
import { AuthService } from '../../services/authFake.services';
import { Register } from '../../interfaces/register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

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

  onSubmit() {
    if (this.registerForm.valid) {
      const register: Register = this.registerForm.value;

      this.authService.register(register).then(
        (response) => {
          if (response) {
            this.toastService.showSuccessToast('Registro completado con éxito!!!');
            this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.LOGIN}`]);
          } else {
            this.toastService.showDangerToast('Error al registrar el usuario!!!');
          }
        },
        (error) => {
          this.toastService.showDangerToast('Error al registrar el usuario!!!');
        }
      );
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
