import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso-model';

//    Acciones de ingresos y egresos

export const SET_ITEMS = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS = '[Ingreso Egreso] Unset Items';

export class SetItemsAction implements Action {
    readonly type = SET_ITEMS;

    constructor( public items: IngresoEgreso[] ) { }
}

export class UnsetItemsAction implements Action {
    readonly type = UNSET_ITEMS;
}

//    definimos los tipos de acciones permitidas

export type acciones = SetItemsAction | UnsetItemsAction;
