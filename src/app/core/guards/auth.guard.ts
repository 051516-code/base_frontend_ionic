import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { APP_ROUTES } from '../../app-routes.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('aio-token');
    
    if (token) {
      // Aquí podrías agregar más lógica para verificar la validez del token
      return true;
    } else {
      // Redirige al usuario a la página de login si no hay token
      this.router.navigate([`${APP_ROUTES.AUTH}`]);
      return false;
    }
  }
}
