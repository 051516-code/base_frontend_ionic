import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './shared/components/splash-screen/splash-screen.component';
import { APP_ROUTES } from './app-routes.constant';

const routes: Routes = [
  {
    path: '',
    component: SplashScreenComponent
  },
  {
    path : APP_ROUTES.AUTH,
    loadChildren:() => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./public/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '**',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
