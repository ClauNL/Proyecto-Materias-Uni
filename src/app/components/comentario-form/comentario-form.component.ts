import { Component } from '@angular/core';
import { Comentario } from "../comentario/comentario.component";
import { FirebaseService } from "../../services/firebase.service";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-comentario-form',
  templateUrl: './comentario-form.component.html',
  styleUrls: ['./comentario-form.component.css']
})
export class ComentarioFormComponent  {

  constructor(private db: FirebaseService, 
    private afAuth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

    ratings = [1,2,3,4,5];
    model = new Comentario();
    submitted = false;


    onSubmit() { 
      this.submitted = true;
      this.db.comentar(Number(this.model.rating), this.model.texto, this.route.snapshot.paramMap.get('id'));
     }

}
