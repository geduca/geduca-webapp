import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/service/aluno.service';


@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html'
})
export class AlunoComponent implements OnInit {

  constructor(private alunoService: AlunoService) {
  }

  ngOnInit() {
  }

}
