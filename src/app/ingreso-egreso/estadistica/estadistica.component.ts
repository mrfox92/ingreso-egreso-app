import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//  import { AppState } from 'src/app/app.reducer';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso-model';
//  Chart JS
import { ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  //  Grafica de donut
  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: any = [];

  public doughnutChartType: ChartType = 'doughnut';


  //  totales
  totalIngresos: number;
  totalEgresos: number;

  contarIngresos: number;
  contarEgresos: number;

  totalBalance: number;

  subscription: Subscription = new Subscription();

  constructor(
    private store: Store<fromIngresoEgreso.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
        .subscribe( ingresoEgreso => {
          //  llamar funcion calculos
          this.contarIngresoEgreso( ingresoEgreso.items );
        });
  }

  contarIngresoEgreso( items: IngresoEgreso[] ) {

    //  inicializacion de las propiedades

    this.totalBalance = 0;

    this.totalIngresos = 0;
    this.totalEgresos = 0;

    this.contarIngresos = 0;
    this.contarEgresos = 0;

    //  recorremos cada uno de los items

    items.forEach( item => {

      //  evaluamos por tipo

      if ( item.tipo === 'ingreso' ) {

        this.totalIngresos += item.monto;
        this.contarIngresos ++;
      } else {

        this.totalEgresos += item.monto;
        this.contarEgresos ++;
      }

    });

    this.totalBalance = ( this.totalIngresos - this.totalEgresos );

    //  enviamos la data a la grafica
    this.doughnutChartData = [ this.totalIngresos, this.totalEgresos ];

  }


}
