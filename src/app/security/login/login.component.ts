import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastrService
  ) {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['home']);
    }
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
        this.router.navigate(['/home']);
      },
      err => {
        if (err.status === 400) {
          if (err.error.error === 'invalid_grant') {
            this.loginForm.get('password').reset();
            this.toast.error('Usuário ou senha inválidos!');
          } else {
            this.toast.error('Ocorreu um erro ao processar sua solicitação: ' + err.message);
          }
        }
      });
  }
}
