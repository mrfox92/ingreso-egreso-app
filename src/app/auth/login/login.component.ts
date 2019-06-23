import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean;
  /* Declaramos una propiedad para manejar las suscripciones de una forma mas eficiente
  Esta propiedad nos permite llamar el unsubscribe cuando se destruye el componente.
  Todo esto con fines de evitar fugas de memoria */
  subscription: Subscription;

  constructor(
    public authService: AuthService,
    public store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading );
  }

  ngOnDestroy() {
    //  destruimos el objeto
    this.subscription.unsubscribe();
  }

  login( data: any ) {

    this.authService.login( data.email, data.password );

  }

}
