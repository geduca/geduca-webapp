import { Component } from '@angular/core';

import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'geduca-webapp';

  constructor(private authService: AuthService) { }

}
