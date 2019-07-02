import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso-model';
import { IngresoEgresoService } from './ingreso-egreso.service';
//  sweet alert
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
//  import { AppState } from '../app.reducer';
import * as fromIngresoEgreso from './ingreso-egreso.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubscription: Subscription = new Subscription();
  loading: boolean;

  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<fromIngresoEgreso.AppState>
  ) { }

  ngOnInit() {

    this.loadingSubscription = this.store.select('ui')
              .subscribe( ui => this.loading = ui.isLoading );

    this.forma = new FormGroup({

      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, [Validators.min(0), Validators.required])

    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  crearIngresoEgreso() {

    //  dispatch de isLoading
    this.store.dispatch( new ActivarLoadingAction() );
    /*
    con el operador de propagacion, separamos los pares de valores de la forma.value
    y mandarlos de forma individual(en pares de valores) y el tipo (ingreso o egreso)
    creando asi un nuevo objeto
     */
    const newIngresoEgreso = new IngresoEgreso({ ... this.forma.value, tipo: this.tipo });

    //  ahora enviamos la data al servicio de ingresos y egresos

    this.ingresoEgresoService.crearIngresoEgreso( newIngresoEgreso )
        .then( () => {
          Swal.fire('Creado con exito', newIngresoEgreso.descripcion, 'success');
          this.forma.reset({ monto: 0 });
          this.store.dispatch( new DesactivarLoadingAction() );
        })
        .catch( err => {
          console.error( err );
          this.store.dispatch( new DesactivarLoadingAction() );
        });

  }

}
