import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from 'src/app/model/nav';

import { AuthService } from './../../core/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'geduca-webapp';
  navItems = navItems;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.deactivate();
    this.router.navigate(['login']);
  }

}
