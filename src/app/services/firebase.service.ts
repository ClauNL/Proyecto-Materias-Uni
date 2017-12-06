import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Materia } from "../components/materia/materia.component";
import { Comentario } from "../components/comentario/comentario.component";
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OrderByPipe } from "../orderByPipe"
import * as firebase from 'firebase';


@Injectable()
export class FirebaseService {

  userId: string;
  userName: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute) {

    this.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
      if (user) this.userName = user.displayName;
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

  comentar(rating, texto, materiaId): void {
    var comentarioData = {
      rating: rating,
      texto: texto,
      userId: this.userId,
      userName: this.userName,
      fecha: firebase.database.ServerValue.TIMESTAMP
    };

    var newKey = firebase.database().ref().child('comentarios').push().key; //clave comentario
    var newKey2 = firebase.database().ref().child('/materias/' + materiaId + '/comentarios').push().key; //clave comentario en materia

    this.db.object('/comentarios/' + newKey).update(comentarioData);  //update comenatrios
    this.db.object('/materias/' + materiaId + '/comentarios/' + newKey2).set(newKey);  //update comentarios en materia

    var materia;
    this.getInfoMateria(materiaId).subscribe(mat => { materia = mat });

    //actualizar ratigs acumulados y total de ratings
    const referencia = this.db.object('/materias/' + materiaId + '/ratings');
    referencia.update({ numRatings: materia.ratings.numRatings + 1 });
    referencia.update({ ratingAcumulado: materia.ratings.ratingAcumulado + comentarioData.rating });

    //calcular nuevo rating promedio
    this.db.object('/materias/' + materiaId + '/ratingPromedio').set(this.promedio(materiaId));

  }

  promedio(MateriaID: string): number {
    var ref = firebase.database().ref().child('/materias').child(MateriaID);
    var numRatings;
    var ratingAcumulado;
    var promedio;
    ref.child('/ratings').on('value',
      function (ratingsSnapshot) {
        var ratingsData = ratingsSnapshot.val();
        numRatings = ratingsData.numRatings;
        ratingAcumulado = ratingsData.ratingAcumulado;
        promedio = ratingAcumulado / numRatings;
      });
    return Math.round(promedio * 100) / 100;
  }

  getComentariosPorMateria(MateriaID: string): Observable<Comentario[]> {

    return this.db.list(`/materias/` + MateriaID + `/comentarios`, {
      query: {
        orderByChild: 'fecha'
      }
    })
      .map((Keys) => Keys
        .map((Key) => {
          return this.db.object(`/comentarios/${Key.$value}`)
        }))
      .switchMap((comments) => {

        return Observable.combineLatest(comments);
      });
  }


  getComentariosPorUsuario(): Observable<Comentario[]> {

    return this.db.list(`/comentarios`, {
      query: {
        orderByChild: 'userId',
        equalTo: this.userId
      }
    })
  }

}
