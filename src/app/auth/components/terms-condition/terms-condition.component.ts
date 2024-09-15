import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/app-routes.constant';
import { AUTH_ROUTES } from '../../auth-routing.constant';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss'],
})
export class TermsConditionComponent {

  constructor(
    private router : Router
  ) { }



  gotToLogin(){
    this.router.navigate([`${APP_ROUTES.AUTH}/${AUTH_ROUTES.REGISTER}`])
  }

}
