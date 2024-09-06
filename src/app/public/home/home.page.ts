import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../core/services/location.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(
    private userLocation : LocationService
  ) {}

ngOnInit(){

  this.userLocation.UserLocation()
  .then(coords => {
    console.log('Latitude:', coords.latitude);
    console.log('Longitude:', coords.longitude);
    console.log(coords)
  })
  .catch(error => {
    console.error(error);
  });
 
}
}
