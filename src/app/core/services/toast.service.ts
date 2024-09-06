import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  async showToast(
    message: string,
    duration: number = 2000,
    color: string = 'success'


  ) {
    const toast = await this.toastController.create({

      message: message,
      duration: duration,
      position: 'bottom',
      color: color,
      cssClass:'my-custom-toast',
      buttons: [
        {
          text: 'Cerrar',
          role: 'Cancel',
          handler : () => {
            console.log('Toast Cerrado')
          }
        }
      ]
    });
    toast.present();
  }

  async showSuccessToast(message: string, duration: number = 2000){
    await this.showToast(message,duration,'success');

  }

  async showDangerToast(message: string, duration: number = 2000){
    await this.showToast(message,duration,'danger');
    
  }


}
