//    importamos las acciones
import * as fromAuth from './auth.actions';
import { User } from './user.model';

//    creamos la interface para manejar el estado de la autenticacion

export interface AuthState {
    user: User;
}

//    inicializamos el estado de la autenticacion

const initialState: AuthState = {
    user: null
};

//    para SET_USER utilizamos el operador de propagacion

export function authReducer( state = initialState, action: fromAuth.acciones ): AuthState {

    switch ( action.type ) {

        case fromAuth.SET_USER:
            return {
                user: { ... action.user }
            };
        case fromAuth.UNSET_USET:
            return {
                user: null
            };
        default:
            return state;
    }
}
