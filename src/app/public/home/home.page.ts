import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../core/services/location.service';
import { Company } from 'src/app/core/interfaces/company.interface';
import {  ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImageSelectionModalComponent } from 'src/app/shared/components/image-selection-modal/image-selection-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  isLoading = false;

  avatarList: Company[] = [
    {
      image: 'assets/img/negro.jpg',
      name: 'Empresa Negra',
      rating: [1, 1, 1, 1, 1], // 5 estrellas
      distance: 5 // 5 km
    },
    {
      image: 'assets/img/moura.jpeg',
      name: 'Empresa Moura',
      rating: [1, 1, 1, 1, 0], // 4 estrellas
      distance: 10 // 10 km
    },
    {
      image: 'assets/img/borracha.jpeg',
      name: 'Empresa Borracha',
      rating: [1, 1, 1, 0, 0], // 3 estrellas
      distance: 15 // 15 km
    },
    {
      image: 'assets/img/borracha.jpeg',
      name: 'Empresa Borracha',
      rating: [1, 1, 1, 0, 0], // 3 estrellas
      distance: 15 // 15 km
    }
  ];

  constructor(
    private userLocation : LocationService,
    private modalControler : ModalController,
   
    private router : Router
  ) {}

    ngOnInit(){

      // this.userLocation.UserLocation()
      // .then(coords => {
      //   console.log('Latitude:', coords.latitude);
      //   console.log('Longitude:', coords.longitude);
      //   console.log(coords)
      // })
      // .catch(error => {
      //   console.error(error);
      // });
    
    }

    async showAlert(){
      const modal = await this.modalControler.create({
        component: ImageSelectionModalComponent,
        cssClass: 'custom-modal' // estilos para el modal
      });

      modal.onDidDismiss().then((result) => {
        if (result.data && result.data.selectedOption) {
          this.handleSelection(result.data.selectedOption);
        }
      });

      await modal.present();

    }


    private handleSelection(selection: string) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        if (selection === 'guincho') {
          console.log('redirecto...Guincho');
          // Implement your navigation logic here
        } else if (selection === 'oficina') {
          console.log('redirecto...oficina');
          // Implement your navigation logic here
        }
      }, 2000);
    }
}
