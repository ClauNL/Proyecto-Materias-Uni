import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FirebaseService } from "../../services/firebase.service";
import { ComentarioComponent, Comentario } from "../comentario/comentario.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  comentarios: Comentario[] = new Array<Comentario>();

  constructor(public auth: AuthService, private db: FirebaseService) { }

  ngOnInit() {
    this.getComentarios();
  }

  getComentarios(): void {
    this.db.getComentariosPorUsuario().subscribe(comentarios => {
      this.comentarios = comentarios;
      console.log(comentarios);
    })
 }



  logout() {
    this.auth.signOut();
  }



}