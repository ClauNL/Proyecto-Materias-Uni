import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ComentarioComponent, Comentario } from "../comentario/comentario.component";
import { ComentarioFormComponent } from "../comentario-form/comentario-form.component";
import {OrderByPipe} from "../../orderByPipe"


@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  @Input() materia: Materia;
  nuevoComentario = false;
  comentarios: Comentario[] = new Array<Comentario>();


  constructor(private db: FirebaseService, 
    private afAuth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getInfoMateria();
    this.getComentarios();
  }


  getInfoMateria(): void {
    this.db.getInfoMateria(this.route.snapshot.paramMap.get('id')).subscribe(materia => {
      this.materia = materia;
      console.log(materia)
    })
  }

  getComentarios(): void {
     this.db.getComentariosPorMateria(this.route.snapshot.paramMap.get('id')).subscribe(comentarios => {
       this.comentarios = comentarios;
       console.log(comentarios);
     })
  }
/*
  calcularPromedio(): number {
    console.log(this.db.calcularPromedio(this.route.snapshot.paramMap.get('id')));
    return this.db.calcularPromedio(this.route.snapshot.paramMap.get('id'));
  }
  
  prueba(): void {
    this.calcularPromedio();
  }
  */

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
  carrera: string;
  foto: string;
  nombre: string;
  profesor: string;
  ratingPromedio: number;
  comentarios: string[];
  ratings: number[];
}