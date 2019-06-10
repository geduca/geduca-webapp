import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Estoque } from 'src/app/model/Estoque';

import { EstoqueService } from '../../../service/estoque.service';

@Component({
  selector: 'app-criar-estoque',
  templateUrl: './criar-estoque.component.html'
})
export class CriarEstoqueComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private estoqueService: EstoqueService,
    private toastr: ToastrService,
    private router: Router,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      descricao: ['']
    });
  }

  cadastrar() {
    this.loader.startBackground();

    const estoque = new Estoque();

    // estoque.nome = this.form.get('nome').value;
    // estoque.descricao = this.form.get('descricao').value;


    this.estoqueService.criar(estoque).subscribe(
      res => {
        this.router.navigate(['/home/estoque']);
        this.toastr.success('Estoque ' + res.codigo + ' - ' + res.nome + ' criado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao criar estoque: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

  verificaValidTouched(campo: string) {
    return this.form.get(campo).invalid && this.form.get(campo).touched;
  }

  aplicaCssErro(campo: string) {
    if (this.verificaValidTouched(campo)) { return 'is-invalid'; }
  }

}
