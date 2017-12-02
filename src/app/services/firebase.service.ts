//import 'rxjs/add/operator/map'
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/combineLatest';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Materia } from "../components/materia/materia.component";
import { Comentario } from "../components/comentario/comentario.component";
import { Observable } from 'rxjs/Rx';


@Injectable()
export class FirebaseService {

  userId: string;
  comentarios: Comentario[];

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


  getComentarios(MateriaID: string): Observable <Comentario[]> {
    
    return this.db.list(`/materias/` + MateriaID + `/comentarios`)
    .map((Keys: Comentario[]) => Keys
        .map((Key: Comentario) => {

            return this.db.object(`/comentarios/${Key.$key}`)
        }))
    .switchMap((comments) => {

        return Observable.combineLatest(comments);
    });

/*
    this.db.list(`/materias/` + MateriaID + `/comentarios`)
      .subscribe((comments) => {
        console.log(comments);
        comments.forEach((comentario) => {
          console.log(comentario);
          console.log(this.db.object(`/comentarios/${comentario.$value}`))
        })
      });
*/

  }

}
