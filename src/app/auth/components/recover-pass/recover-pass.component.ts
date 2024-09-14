import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { CodeVeryfy, RequestCode } from '../../interfaces/recover-pass.interface';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss'],
})
export class RecoverPassComponent  implements OnInit {
currentStep: 'requestEmail' | 'verifyCode' | 'resetPass' = 'requestEmail' // todo:  estado para determinar que paso mostrar
isLoading  = false;
private resetCode : string | null = null; //todo: codigo de recuperacion


constructor(
  private authService : AuthService,
  private router :  Router,
  private toastService : ToastService
) { }

  ngOnInit() : void {}


//TODO: logica para manejar la solicitud de codigo
async handleEmailSubmit(requestCode : RequestCode){
  console.log('Email recibido:', requestCode);
  this.isLoading = true; //TODO: indicador de carga



  try {
    const result = await this.authService.requestCode(requestCode).toPromise()
    
    if(result.success) {
        await this.toastService.showSuccessToast('Código enviado al correo.');
        this.currentStep = 'verifyCode'; // Avanzar al siguiente paso

   }else {

     await this.toastService.showDangerToast(result.message || 'Codigo de verificacion invalido.')
   }

  } catch (error) {

    await this.toastService.showDangerToast('Error al solicitar el código.');
  
  }finally {

    this.isLoading = false;
  }

}

//TODO: logica para manejar la verificacion del codigo
async handleCodeSubmit(code : any) {
  
  this.isLoading = true; //todo: indicador de carga

  //todo: preparamos data
  const requestCode : CodeVeryfy = {code}

  try {
    
    const result = await this.authService.verifyCode(requestCode).toPromise();
    
    if(result.success) {
       this.resetCode = code; // todo: almacena el codigo 
       this.currentStep = 'resetPass'; //todo: avanza al siguiente paso

    }else {

      await this.toastService.showDangerToast(result.message || 'Codigo de verificacion invalido.')
    }

  } catch (error) {

    await this.toastService.showDangerToast( 'Error al verificar el codigo.')
  
  } finally {
    this.isLoading = false ;
  }
}


//TODO: logica para manejar el reestablecimiento de la contrasena
async onResetPassword(password :  string){


  if( this.resetCode){
    this.isLoading = true; // todo: marcador de carga

    try {

      const response = await this.authService.resetPassword(this.resetCode, password).toPromise();

      if( response.success){
        await this.toastService.showSuccessToast('Contrasenha restablecida Exitosamente');
        this.router.navigate(['/login']) //todo: redirect to

      }else {

        await this.toastService.showDangerToast(response.message || 'Error al restablecer la contrasenha');
      
      }

    } catch (error) {
      
    }finally{

      this.isLoading = false ;

    }
  }
}


}
