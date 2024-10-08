import { Component, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RequestCode } from '../../../interfaces/recover-pass.interface';

@Component({
  selector: 'app-request-email',
  templateUrl: './request-email.component.html',
  styleUrls: ['./request-email.component.scss'],
})
export class RequestEmailComponent  {
  @Output() emailSubmited = new EventEmitter<RequestCode>(); // TODO: emitimos el email
  requestForm : FormGroup ;


  constructor(
    private fb : FormBuilder
  ) {
    //TODO: validacion
      this.requestForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      })
   }

   onRequestSubmit(){
    if( this.requestForm.valid){
      //TODO> obtenemos el dato del formulario valido
      const email = this.requestForm.get('email')?.value;

      // todo: Construir el objeto para la solicitud
      const requestCode: RequestCode = { email };
      
      //TODO> emitimos el dato
      this.emailSubmited.emit(requestCode)
    }
   }

}
