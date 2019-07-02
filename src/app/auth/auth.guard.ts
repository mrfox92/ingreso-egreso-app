import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( public authService: AuthService ) { }

  //  canActivate espera un observable que retorna un boolean o una promesa que retorna un boolean.

  canActivate() {
    //  retornamos el resultado de la funcion para comprobar si hay un usuario autenticado o no
    return this.authService.isAuth();
  }

  canLoad() {
    //  Se retorna un observable, para ello tenemos que ejecutar la suscripcion una unica vez y luego finalizar la suscripcion
    return this.authService.isAuth().pipe( take(1) );
  }
}
