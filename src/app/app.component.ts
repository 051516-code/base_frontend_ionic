import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { APP_ROUTES } from 'src/app/app-routes.constant';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  isAuthenticated: boolean = false;

  constructor(

    private router : Router,
    private authService: AuthService,
    private menuController : MenuController
  ) {}

  ngOnInit(): void {
    //TODO: verificamos si esta authenticado 
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

  }

  goToLogout() {
    this.authService.logout().subscribe(success => {
      if (success) {
        // Maneja la redirección después de eliminar el token
        this.closeMenu();
        this.router.navigate([`${APP_ROUTES.AUTH}`]);
      }
    });
  }

  closeMenu() : void{
    this.menuController.close();
  }
}
