import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CodeVerify } from '../../../interfaces/recover-pass.interface';
import { ToastService } from './../../../../core/services/toast.service';


@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent {
@Output() codeSubmited = new EventEmitter<CodeVerify>();
verifyForm  :  FormGroup;
controls : number[] = [0, 1, 2, 3,]; 


constructor(
  private fb: FormBuilder,
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
    this.toastService.showDangerToast('El código no debe tener letras.');
    input.value = value.replace(/\D/g, '');
  }
}

async onVeriFySubmit(){

  if(this.verifyForm.valid){
    //TODO: obtener valos del formulario
    const codeObj = this.verifyForm.value;
    const codeStr = Object.values(codeObj).join('') // todo: convertir a string los numeros
  
    //todo: construir el objeto para la solicitud
    const codeVerify : CodeVerify = { codeStr }
  
    //TODO> emitimos el dato
    this.codeSubmited.emit(codeVerify)
  }

}


}
