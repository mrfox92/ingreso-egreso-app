import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
//  sweet alert
import Swal from 'sweetalert2';
//  usamos interfaces de firebase
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    //  Este metodo estara en escucha cuando cambie el estado del usuario autenticado
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {


      if ( fbUser ) {

        this.userSubscription = this.afDB.doc(`${ fbUser.uid }/usuario`).valueChanges()
            .subscribe( (usuarioObj: any) => {

              const newUser = new User( usuarioObj );
              //  hacemos el dispatch de la accion
              this.store.dispatch(  new SetUserAction( newUser ) );
              this.usuario = newUser;
            });

      } else {
        this.usuario = null;
        this.userSubscription.unsubscribe();
      }

    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {

    //  dispatch de la accion isLoading
    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth.createUserWithEmailAndPassword( email, password )
        .then( resp => {
          //  creamos el objeto con la data de nuestro nuevo usuario
          const user: User = {
            uid: resp.user.uid,
            nombre: `${nombre}`,
            email: resp.user.email
          };

          //  enviamos el objeto a un documento en firebase

          this.afDB.doc(`${ user.uid }/usuario`)
              .set( user )
              .then( () => {
                Swal.fire('Registro completado', `${ user.nombre } te has registrado exitosamente`, 'success');
                this.router.navigate(['/']);
                this.store.dispatch( new DesactivarLoadingAction() );
              })
              .catch( error => {
                this.store.dispatch( new DesactivarLoadingAction() );
                Swal.fire('Error al crear usuario', error.message, 'error');
              });

        })
        .catch( error => {
          this.store.dispatch( new DesactivarLoadingAction() );
          Swal.fire('Error al crear usuario', error.message, 'error');
        });
  }

  login( email: string, password: string) {

    //  dispatch de isLoading

    this.store.dispatch( new ActivarLoadingAction() );

    this.afAuth.auth.signInWithEmailAndPassword( email, password )
        .then( resp => {
          this.router.navigate(['/']);
          this.store.dispatch( new DesactivarLoadingAction() );
        })
        .catch( error => {
          this.store.dispatch( new DesactivarLoadingAction() );
          Swal.fire('Error en el login', error.message, 'error');
        });
  }

  logout() {
    //  navegamos hasta el login
    this.router.navigate(['/login']);
    //  cerramos sesion
    this.afAuth.auth.signOut();

    //  realizar dispatch de ingresoEgresoItems unset
    this.store.dispatch( new UnsetUserAction() );
  }

  isAuth() {
    //  si el usuario autenticado es distinto de null, retorna un true, caso contrario un false
    return this.afAuth.authState.pipe( map( fbUser => {

      if ( fbUser === null ) {
        this.router.navigate(['/login']);
      }

      return fbUser != null;
    }));
  }

  getUsuario() {
    //  extraemos todo lo que contiene el objeto usuario y enviamos sus propiedades a traves del operador spread
    return { ... this.usuario };
  }
}
