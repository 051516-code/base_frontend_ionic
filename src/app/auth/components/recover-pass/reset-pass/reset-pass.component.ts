import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewPassword } from '../../../interfaces/recover-pass.interface';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss'],
})
export class ResetPassComponent  implements OnInit {
  @Output() passwordSubmited = new EventEmitter<NewPassword>();
  resetForm : FormGroup; 


  constructor(
    private fb : FormBuilder,
  )  {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator })
   }

  ngOnInit() : void {
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

    async onResetSubmit() {
      if (this.resetForm.valid) {
        // Obtenemos el dato del formulario válido
        const password = this.resetForm.get('password')?.value;
    
        // Construimos el objeto para la solicitud
        const newPassword: NewPassword = { password };
    
        // Emitimos el dato
        this.passwordSubmited.emit(newPassword);
      }
    }
  }