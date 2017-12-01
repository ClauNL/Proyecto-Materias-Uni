import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Materia } from "../materia/materia.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})



export class MateriasComponent implements OnInit {

  materias: Materia[];

  constructor(private db: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.getListaMaterias();
  }

  getListaMaterias(): void {
    this.db.getListaMaterias().subscribe(materias => {
      this.materias = materias;
      console.log(materias)
    })
  }
}


