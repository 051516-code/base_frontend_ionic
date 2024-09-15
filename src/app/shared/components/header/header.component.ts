import { Router } from '@angular/router';
import { Component, Input} from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { APP_ROUTES } from 'src/app/app-routes.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
@Input() sectionName : string = ''



  constructor(
    private router : Router,
    private authService: AuthService 
  ) { }

  ngOnInit() {}

  logOut() {
    this.authService.logout().subscribe(success => {
      if (success) {
        // Maneja la redirección después de eliminar el token
        this.router.navigate([`${APP_ROUTES.AUTH}`]);
      }
    });
  }

}
