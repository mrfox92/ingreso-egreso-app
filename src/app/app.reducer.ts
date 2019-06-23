//    =================================================================
//    Este es el archivo global que tiene toda la definicion del estado
//    =================================================================

//    ActionReducerMap nos permite fusionar varios reducers en uno solo.
import { ActionReducerMap } from '@ngrx/store';
//    importamos el reducer de la UI
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

//    creamos la interface del estado de la app
export interface AppState {
    ui: fromUI.State;
    user: fromAuth.AuthState;
}

//    creamos la configuracion global de los reducers

export const appReducers: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    user: fromAuth.authReducer
};



