import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MostPopularComponent } from './components/most-popular/most-popular.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';



@NgModule({
  declarations: [
    MapComponent,
    LoadingComponent,
    MostPopularComponent,
    SplashScreenComponent
  ],
  imports: [
    CommonModule // Esto permite usar cosas como *ngIf, *ngFor en los componentes
  ],
  exports : [
    MapComponent,
    LoadingComponent,
    MostPopularComponent,
    SplashScreenComponent,
    CommonModule // Exportando CommonModule para no tener que importarlo en los módulos que usen SharedModule
  ]
})
export class SharedModule { }
