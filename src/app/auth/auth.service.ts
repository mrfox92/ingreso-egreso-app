import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//  usamos interfaces de firebase
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router
  ) { }

  initAuthListener() {
    //  Este metodo estara en escucha cuando cambie el estado del usuario
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {

      console.log( fbUser );

    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {

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
                Swal.fire('Registro completado', 'Registrado con éxito', 'success');
                this.router.navigate(['/']);
              })
              .catch( error => {
                Swal.fire('Error al crear usuario', error.message, 'error');
              });

        })
        .catch( error => {
          Swal.fire('Error al crear usuario', error.message, 'error');
        });
  }

  login( email: string, password: string) {

    this.afAuth.auth.signInWithEmailAndPassword( email, password )
        .then( resp => {
          this.router.navigate(['/']);
        })
        .catch( error => {
          Swal.fire('Error en el login', error.message, 'error');
        });
  }

  logout() {
    //  navegamos hasta el login
    this.router.navigate(['/login']);
    //  cerramos sesion
    this.afAuth.auth.signOut();
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
}
