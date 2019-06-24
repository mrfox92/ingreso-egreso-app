import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso-model';

//    creamos una interface para manejar el estado de ingresos y egresos
export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

//    realizamos la inicializacion del estado de ingresos y egresos
const initialState: IngresoEgresoState = {
    items: []
};


//    definimos nuestra funcion reducer

export function ingresoEgresoReducer( state = initialState, action: fromIngresoEgreso.acciones ): IngresoEgresoState {

    switch ( action.type ) {

        case fromIngresoEgreso.SET_ITEMS:
            return {
                items: [
                    ...action.items.map( item => {
                        return {
                            ...item
                        };
                    })
                ]
            };
        case fromIngresoEgreso.UNSET_ITEMS:
            return {
                items: []
            };
        default:
            return state;
    }
}


//    debemos declarar este reducer en nuestro app reducer para su uso global
