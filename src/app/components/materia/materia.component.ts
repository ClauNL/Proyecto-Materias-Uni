import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Comentario } from "../comentario/comentario.component";

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  @Input() materia: Materia;
  comentarios: Comentario[] = new Array<Comentario>();


  constructor(private db: FirebaseService,
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
     this.db.getComentarios(this.route.snapshot.paramMap.get('id')).subscribe(comentarios => {
       this.comentarios = comentarios;
       console.log(comentarios);
     })
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
  raitingPromedio: number;
  comentarios: string[];
  raitings: number[];
}