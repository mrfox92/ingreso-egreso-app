import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
//  import { AuthGuard } from '../auth/auth.guard';
//  Un modulo siempre es un componente aislado, por lo cual si se necesita utilizar algunos componentes
//  o modulos propios, se deben declarar en los exports

//  exportamos el RouterModule que contiene la configuracion de mis rutas hijas

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    //  canActivate: [ AuthGuard ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
