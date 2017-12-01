import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MateriasComponent } from './components/materias/materias.component';
import { MateriaComponent } from './components/materia/materia.component';


import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { RouterModule, Routes } from '@angular/router';

import { AuthService } from "./services/auth.service";
import { FirebaseService } from "./services/firebase.service";
import { ComentarioComponent } from './components/comentario/comentario.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/user-profile', pathMatch: 'full' },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'materias', component: MateriasComponent },
  { path: 'materia/:id', component: MateriaComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    NavbarComponent,
    MateriasComponent,
    MateriaComponent,
    ComentarioComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(appRoutes),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [AuthService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
