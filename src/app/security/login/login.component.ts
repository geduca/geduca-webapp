import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.auth.authenticate(username, password).subscribe(
      res => {
        console.log('autenticado');
        this.router.navigate(['/home']);
      },
      err => {
        if (err.status === 400) {
          if (err.error === 'invalid_grant') {
            this.loginForm.get('password').reset();
            return 'Usuário ou senha inválidos!';
          }
        }
        return err;
      });

  }

}
