import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  LoginFormGroup !: FormGroup;
  ErrorMessage !: string


  constructor(
    private fb: FormBuilder,
    private loginservice: AuthentificationService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.LoginFormGroup = this.fb.group({
      username : this.fb.control(null),
      password : this.fb.control(null)
    })


  }


  handleLoginService() {
    let username = this.LoginFormGroup.get('username')!.value;
    let password = this.LoginFormGroup.get('password')!.value;
    if (username != null) {
      this.loginservice.LoginService(username, password).subscribe({
        next: (data) => {
          this.loginservice.authentifiedUser(data).subscribe({
            next: value => {
              this.router.navigateByUrl("admin/products");
            }
          })
        },
        error: err => {
          this.ErrorMessage = err;
        }

      })
    }

  }
}
