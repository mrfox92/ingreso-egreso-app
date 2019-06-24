import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso-model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  //  manejamos propiedades de tipo Subscription para manejar la fuja de memoria y/o informacion

  initSubscription: Subscription = new Subscription();
  itemsSubscription: Subscription = new Subscription();

  constructor(
    private afDB: AngularFirestore,
    private store: Store<AppState>,
    public auth: AuthService
  ) { }

  initIngresoEgresoListener() {

    //  1-  realizamos una conversion de la data a mostrar
    //  2-  Filtramos la data a mostrar a partir de una condicion en el operador filter()
    //  3-  Nos suscribimos al retorno de la informacion que realiza el observable
    //  4-  llamamos a la funcion privada ingresoEgresoItems y pasamos el uid del usuario actual

    this.initSubscription = this.store.select('auth')
      .pipe(
        filter( auth => auth.user !== null )
      )
      .subscribe( auth => this.ingresoEgresoItems( auth.user.uid ));

  }

  //  En firebase un documento se utiliza para recuperar un elemento en formato JSON
  //  En firebase una coleccion se utiliza para recuperar ya un array de elementos

  private ingresoEgresoItems( uid: string ) {

    //  1-  definimos el path en donde se encuentra la coleccion de datos de ingreso y egreso.
    //  2-  utilizamos la funcion snapshotChanges() con la cual podemos obtener toda la data del documento
    //  3-  pasamos esa data por el pipe para transformar la data junto a map
    //  4-  retornamos un nuevo array con la coleccion de datos que contendra cada uno de los objeto de la coleccion
    //  5-  el contenido de cada objeto de la coleccion seran uid, descripcion, tipo y monto.
    //  6-  Finalmente nos suscribimos al retorno de la coleccion ya formateada
    //  7-  Realizamos el dispatch de nuestra accion SetItemsAction y pasamos la coleccion como argumento al constructor

    this.itemsSubscription = this.afDB.collection(`${ uid }/ingresos-egresos/items`)
        .snapshotChanges()
        .pipe(
          map( docData => {
            return docData.map( doc => {
              return {
                uid: doc.payload.doc.id,
                //  Al utilizar el operador spread separa los pares de datos de forma automatica
                ...doc.payload.doc.data()
              };
            });
          })
        )
        .subscribe( (collection: any[] ) => {
          //  realizamos dispatch de ingresoEgresoItems
          this.store.dispatch( new SetItemsAction( collection ) );
        });

  }

  //  Esta accion se debe llamar en el auth al realizar un logout()
  cancelarSubscriptions() {

    this.initSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
    //  realizamos el dispatch de los items
    this.store.dispatch( new UnsetItemsAction() );

  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
    //  obtenemos el usuario
    const user = this.auth.getUsuario();
    //  añadimos un nuevo elemento a la DB de firebase
    return this.afDB.doc(`${ user.uid }/ingresos-egresos`)
        .collection('items').add({...ingresoEgreso});
  }

  borrarIngresoEgreso( uid: string ) {
    //  obtenemos el usuario
    const user = this.auth.getUsuario();

    //  borramos un elemento de la BD a partir de su uid

    return this.afDB.doc(`${ user.uid }/ingresos-egresos/items/${ uid }`).delete();
  }

}
