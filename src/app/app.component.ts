import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/service/auth.service';
import { navItems } from './model/nav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'geduca-webapp';
  navItems = navItems;
  mostrarHeader = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.mostrarHeaderEmitter.subscribe(
      res => this.mostrarHeader = res
    );
  }
}
