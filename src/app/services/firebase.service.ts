import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Materia } from "../components/materia/materia.component";
import { Comentario } from "../components/comentario/comentario.component";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {

  userId: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
      console.log(this.userId)
    })
  }


  getListaMaterias(): FirebaseListObservable<Materia[]> {
    if (!this.userId) return;
    return this.db.list(`materias`)
  }

  getInfoMateria(id: string): Observable<Materia> {
    if (!this.userId) return;
    return this.db.object(`/materias/` + id);
  }

  getComentario(id: string): Observable<Comentario> {
    if (!this.userId) return;
    return this.db.object(`/comentarios/` + id);
  }


}
