import { Injectable } from '@angular/core';
import {User} from "../model/product.model";
import { UUID } from 'angular2-uuid';
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  Users : User[] = []
  Userauthentified !: User | null;

  constructor() {
    this.Users.push(
      {Id : UUID.UUID(), name : 'USER1', password : '123', role : ['USER'] },
      {Id : UUID.UUID(), name : 'admin', password : '123', role : ['USER', 'ADMIN'] },
      {Id : UUID.UUID(), name : 'USER3', password : '123', role : ['USER'] }
    )
  }
  LoginService(name : string, password : string) :Observable<User> {
    let user = this.Users.find(u => u.name == name);
    if (!user) return throwError(()=>new Error("User indefined !!!"));
    let pswd =  this.Users.find(u => u.password == password);
    if (!pswd) return throwError(()=> new Error("Non identical password !!!"))
    return of(user)
  }

  public authentifiedUser(authe : User): Observable<User>{
    this.Userauthentified = authe
    localStorage.setItem("user", JSON.stringify({name : authe.name, password : authe.password, jwt : "JWT-token"}))
    return of(authe)
  }

  public hasrole(role : string){
    return this.Userauthentified?.role.includes(role)
  }

  isAuthentified(){
    return this.Userauthentified != undefined
  }

  logout():Observable<boolean> {
    this.Userauthentified = null;
    localStorage.clear();
    return of(true)
  }

}
