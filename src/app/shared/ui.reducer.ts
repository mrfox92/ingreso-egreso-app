
import * as fromUI from './ui.actions';

//    Creamos una interface para el estado inicial de la UI

export interface State {
    isLoading: boolean;
}

//    definimos el estado inicial de la UI de usuario

const initState: State = {
    isLoading: false
};


//    Nota: si tenemos mas propiedades dentro de cada accion, entonces se utiliza el operador de propagacion

//    creamos nuestro reducer

export function uiReducer( state = initState, action: fromUI.acciones ): State {

    switch ( action.type ) {

        case fromUI.ACTIVAR_LOADING:

            return {
                isLoading: true
            };

        case fromUI.DESACTIVAR_LOADING:

            return {
                isLoading: false
            };

        default:
            return state;
    }
}



