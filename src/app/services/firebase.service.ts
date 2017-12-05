//import 'rxjs/add/operator/map'
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/combineLatest';

import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Materia } from "../components/materia/materia.component";
import { Comentario } from "../components/comentario/comentario.component";
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {OrderByPipe} from "../orderByPipe"
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
    
    var newKey = firebase.database().ref().child('comentarios').push().key;
    var newKey2 = firebase.database().ref().child('/materias/' + materiaId + '/comentarios').push().key;
    var newKey3 = firebase.database().ref().child('/materias/' + materiaId + '/ratings').push().key;

    var updates = {};
    updates['/comentarios/' + newKey] = comentarioData;
    updates['/materias/' + materiaId + '/comentarios/' + newKey2] = newKey;
    updates['/materias/' + materiaId + '/ratings/' + newKey3] = comentarioData.rating;

    firebase.database().ref().update(updates);

  }



  getComentariosPorMateria(MateriaID: string): Observable<Comentario[]> {

    return this.db.list(`/materias/` + MateriaID + `/comentarios`, {
      query: {
        orderByChild: 'fecha',
        limitToLast: 20
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

  /*
    calcularPromedio(MateriaID: string): Observable<number> {
      
      var prom;
      var total: Observable<number>;
      var cant = 0;
      
      this.db.list(`/materias/` + MateriaID + `/raitings`)
        .subscribe(raitings => {
          raitings.forEach(raiting => {
            total = total + raiting.$value;
            cant = cant+1;
          })
        });
        
        total = this.db.list(`/materias/` + MateriaID + `/raitings`).count();
        
        this.db.list('/materias/' + MateriaID + '/raitings')
  
  
        ref => ref.orderByChild('size').equalTo('large'))
        .subscribe(raitings => {
          var total: Number = 0.0
          raitings.forEach(raiting => {
            let snap = raiting;
            let val = snap.value;
            total += val
          })
          snapshot.forEach(function(voteSnapshot) {
            total += voteSnapshot.val().vote;
        });
        });
  
  */
  /*
        let placesRef = this.db.database.ref.
        child("akapnapp")
        
        placesRef.observeSingleEvent(of: .value, with: { snapshot in
        
            for child in snapshot.children {
        
                let placeSnap = child as! FIRDataSnapshot
                let ratingsSnap = placeSnap.childSnapshot(forPath: "rating")
        
                let count = ratingsSnap.childrenCount
                var total: Double = 0.0
                for child in ratingsSnap.children {
                    print(child)
                    let snap = child as! FIRDataSnapshot
                    let val = snap.value as! Double
                    total += val
                }
                let average = total/Double(count)
                print(average)
            }
        })
  
  
  
  
        console.log(total);
        console.log(cant);
      
        return (total);
  
    }
  */



}
