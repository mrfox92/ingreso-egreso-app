import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( public authService: AuthService ) { }

  //  canActivate espera un observable que retorna un boolean o una promesa que retorna un boolean.

  canActivate() {
    //  retornamos el resultado de la funcion para comprobar si hay un usuario autenticado o no
    return this.authService.isAuth();
  }
}
