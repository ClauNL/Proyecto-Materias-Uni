import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from "../../services/firebase.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  @Input() comentarios: Comentario[];

  constructor(private db: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
  }

}

export class Comentario {

  constructor(
    public $key?: string,
    public rating?: number,
    public texto?: string,
    public userId?: string,
    public userName?: string,
  ) {}
}









