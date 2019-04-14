import { Component, OnInit } from '@angular/core';
import { navItems } from 'src/app/model/nav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'geduca-webapp';
  navItems = navItems;

  constructor() { }

  ngOnInit() {
  }

}
