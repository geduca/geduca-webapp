import { Component } from '@angular/core';

import { AuthService } from './core/service/auth.service';
import { navItems } from './model/nav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geduca-webapp';
  navItems = navItems;

  constructor(private authService: AuthService) { }

}
