import { Action } from '@ngrx/store';
import { User } from './user.model';

//    Acciones de autenticacion

export const SET_USER = '[Auth] Set User';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor( public user: User ) {}
}

//    exportamos nuestras acciones validas y permitidas
export type acciones = SetUserAction;
