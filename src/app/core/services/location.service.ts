import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getUserLocation(): Observable<GeolocationPosition> {
    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            observer.next(position);
            observer.complete();
          },
          error => observer.error(error),
          { enableHighAccuracy: true }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  async UserLocation(): Promise<{ latitude: number, longitude: number }> {
    return new Promise((resolve, reject) => {
      this.getUserLocation().subscribe(
        position => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          resolve(coords);
        },
        error => {
          console.error('Error getting location:', error);
          reject('Error getting location');
        }
      );
    });
  }
}


// this way to use 
// this.userLocation.UserLocation()
// .then(coords => {
//   console.log('Latitude:', coords.latitude);
//   console.log('Longitude:', coords.longitude);
//   console.log(coords)
// })
// .catch(error => {
//   console.error(error);
// });