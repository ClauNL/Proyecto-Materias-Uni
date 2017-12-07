import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ComentarioComponent, Comentario } from "../comentario/comentario.component";
import { ComentarioFormComponent } from "../comentario-form/comentario-form.component";
import {OrderByPipe} from "../../orderByPipe"; 
import {Profesor} from "../materia/Profesor"; 

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  @Input() materia: Materia;
  nuevoComentario = false;
  comentarios: Comentario[] = new Array<Comentario>();
  profes: Profesor[] = new Array<Profesor>(); 

  constructor(private db: FirebaseService, 
    private afAuth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }
   
  ngOnInit() {
    this.getInfoMateria();
    this.getComentarios();
    this.getProfesores(); 
  }


  getInfoMateria(): void {
    this.db.getInfoMateria(this.route.snapshot.paramMap.get('id')).subscribe(materia => {
      this.materia = materia;
      
    })
  }

  getProfesores(): void {
    this.db.profesores(this.route.snapshot.paramMap.get('id')).subscribe(Profesores => {
      this.profes = Profesores; 
      console.log(this.profes); 

    })


  }
 

  getComentarios(): void {
     this.db.getComentariosPorMateria(this.route.snapshot.paramMap.get('id')).subscribe(comentarios => {
     
      this.comentarios = comentarios;
       console.log(comentarios);
     })
  }

  calcularPromedio(): void {
      this.db.promedio(this.route.snapshot.paramMap.get('id'));
  }
  
  prueba(): void {
    this.calcularPromedio();
  }
  /**/

  agregar(): void {
    this.nuevoComentario = true;
  }

  comentar(rating, texto): void {
    this.db.comentar(rating, texto, this.route.snapshot.paramMap.get('id'));
  }

  goBack(): void {
    this.location.back();
  }

  
  
  




}



export class Materia {
  carrera?: string;
  foto?: string;
  nombre?: string;
  Profesores?: Profesor[];
  ratingPromedio?: number;
  comentarios?: string[];
  ratings: {
    numRatings: number;
    ratingAcumulado: number
  }
}

