import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(public auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  private signIn(): void {
    this.auth.signIn();
    this.router.navigate(['/user-profile']);
    
  }

  private afterSignIn(): void {
    this.router.navigate(['/']);
  }

  logout() {
    this.auth.signOut();
  }



}
