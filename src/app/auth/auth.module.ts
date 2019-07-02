import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
//    Formularios por template
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        AngularFireAuthModule,    // imports firebase/auth, only needed for auth features
        FormsModule,
        RouterModule
    ]
})
export class AuthModule {}
