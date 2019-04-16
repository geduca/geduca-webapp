import { Component, OnInit } from '@angular/core';
import { navItems } from 'src/app/model/nav';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html'
})
export class AlunosComponent implements OnInit {
  title = 'geduca-webapp';
  navItems = navItems;

  constructor() { }

  ngOnInit() {
  }


}
