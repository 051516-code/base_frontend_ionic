import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { APP_ROUTES } from './../../../app-routes.constant';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent  implements OnInit {
  showSplash = true;
  showOverlay = false;

  constructor(
    private router : Router
  ) { }

  ngOnInit() : void{
    
    this.showOverlay = true; // todo: capa de transicion

    setTimeout(() => {
      this.showSplash = false; // todo: oculta el splash
      
      this.router.navigate([APP_ROUTES.AUTH])
    }, 3000 )
  }

}
