import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MostPopularComponent } from './components/most-popular/most-popular.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { ImageSelectionModalComponent } from './components/image-selection-modal/image-selection-modal.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    MapComponent,
    LoadingComponent,
    MostPopularComponent,
    SplashScreenComponent,
    ImageSelectionModalComponent,
    SidebarComponent,
    HeaderComponent

  ],
  imports: [
    CommonModule // Esto permite usar cosas como *ngIf, *ngFor en los componentes
  ],
  exports : [
    MapComponent,
    LoadingComponent,
    MostPopularComponent,
    SplashScreenComponent,
    HeaderComponent,
    CommonModule // Exportando CommonModule para no tener que importarlo en los módulos que usen SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
