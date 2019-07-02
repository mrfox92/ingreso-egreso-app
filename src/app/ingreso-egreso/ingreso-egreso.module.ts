import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { SpacePipe } from './space.pipe';

//  Reactives Forms
import { ReactiveFormsModule } from '@angular/forms';

//  Modulo componentes compartidos
import { SharedModule } from '../shared/shared.module';

//  ChartJS
import { ChartsModule } from 'ng2-charts';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
//  Reducer modulo de ingreso y egreso
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

//  al cargar este modulo, tambien cargara la configuracion de rutas y el router outlet

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe,
    SpacePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature( 'ingresoEgreso', ingresoEgresoReducer )  //  recibe el nombre del nodo que deseamos poner aqui y el reducer
  ]
})
export class IngresoEgresoModule { }
