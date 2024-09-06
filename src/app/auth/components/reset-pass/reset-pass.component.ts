
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../app-routes.constant';
import { AUTH_ROUTES } from '../../auth-routing.constant';
import { AuthService } from '../../services/authFake.services';
import { ToastService } from '../../../core/services/toast.service';


@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
})
export class ResetPassComponent implements OnInit{
  resetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.resetForm.reset();
  }

  // Custom validator for password matching
  passwordMatchValidator = (form: FormGroup) => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  };

  // Submit function to handle form submission
  async onResetSubmit() {
    if (this.resetForm.valid) {
      const password = this.resetForm.value.password;
      const code = this.getCodeFromUrl(); // Get the code from the URL

      try {
        await this.authService.ressetPassword(code, password);
        await this.toastService.showSuccessToast('Contraseña restablecida exitosamente.');
        this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.LOGIN}`]);
      } catch (error) {
        await this.toastService.showDangerToast('Error al restablecer la contraseña.');
      }
    }
  }

  // Helper function to extract code from URL
  private getCodeFromUrl(): string {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code') || '';
  }
}