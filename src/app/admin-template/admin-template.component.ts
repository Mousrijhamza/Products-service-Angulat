import { Component } from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {
  private _user !: string;
  constructor(private auth : AuthentificationService, private router : Router) {
    if (auth.Userauthentified !=undefined) this._user=auth.Userauthentified.name;

  }

  public get user(): string {
    return this._user;
  }

  handlelogout() {
    this.auth.logout().subscribe({
      next : value => {
        this.router.navigateByUrl("/login")
      }
    })
  }
}

