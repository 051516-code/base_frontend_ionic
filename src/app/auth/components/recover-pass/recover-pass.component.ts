import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { CodeVerify, RequestCode , NewPassword } from '../../interfaces/recover-pass.interface';
import { APP_ROUTES } from '../../../app-routes.constant';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss'],
})
export class RecoverPassComponent  implements OnInit {
currentStep: 'requestCode' | 'verifyCode' | 'resetPass' = 'requestCode' // todo:  estado para determinar que paso mostrar
isLoading  = false;
private resetCode : string | null = null; // todo: codigo de recuperacion


constructor(
  private authService : AuthService,
  private router :  Router,
  private toastService : ToastService
) { }

  ngOnInit() : void {}


//TODO: logica para manejar la solicitud de codigo
async handleEmailSubmit(requestCode : RequestCode){
  this.isLoading = true; //TODO: indicador de carga 

  try {
    //TODO: hacemos la peticion al servicio
    const result = await this.authService.requestCode(requestCode).toPromise()
    // console.log('Resultado del servicio para Email: '+ result.message)
    
    if(result.success) {
        await this.toastService.showSuccessToast(result.message);
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
async handleCodeSubmit(code: CodeVerify) {
  this.isLoading = true; // todo: Indicador de carga activado
  
  try {
    //TODO> hacemos la peticion al servicio
    const result = await this.authService.verifyCode(code).toPromise();
    console.log('resultado del back: '+ result.message)
    
    if(result.success) {
      await this.toastService.showSuccessToast(result.message);
      this.resetCode = code.codeStr; // todo: Almacenar el código si la respuesta es exitosa
      this.currentStep = 'resetPass'; // todo: Avanzar al siguiente paso
    } else {
      // todo: Mostrar mensaje de error si el código no es válido
      await this.toastService.showDangerToast(result.message || 'Código de verificación inválido.');
    }
  } catch (error) {
    //todo: Manejar errores en la solicitud
    await this.toastService.showDangerToast('Error al verificar el código.');
  } finally {
    // todo: Indicador de carga desactivado
    this.isLoading = false;
  }
}



//TODO: logica para manejar el reestablecimiento de la contrasena
async onResetPassword(password :  NewPassword){

    this.isLoading = true; // todo: marcador de carga


    try {

      const result = await this.authService.resetPassword(this.resetCode!, password.password).toPromise();

      if( result.success){
        await this.toastService.showSuccessToast(result.message || 'Contrasenha restablecida Exitosamente');
        this.router.navigate([`${APP_ROUTES.AUTH}`]) //todo: redirect to login
        this

      }else {

        await this.toastService.showDangerToast(result.message || 'Error al restablecer la contrasenha');
      
      }

    } catch (error) {
      
    }finally{

      this.isLoading = false ;

    }

}

}
