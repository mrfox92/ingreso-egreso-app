import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor( public authService: AuthService ) { }

  ngOnInit() { }

  login( data: any ) {

    this.authService.login( data.email, data.password );

  }

}
