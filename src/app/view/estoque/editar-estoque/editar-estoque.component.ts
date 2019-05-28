import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Estoque } from '../../../model/Estoque';
import { EstoqueService } from '../../../service/estoque.service';


@Component({
  selector: 'app-editar-estoque',
  templateUrl: './editar-estoque.component.html'
})
export class EditarEstoqueComponent implements OnInit {

  estoque: Estoque;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private estoqueService: EstoqueService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.estoqueService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.estoque = res;
      this.form.get('nome').setValue(this.estoque.nome);
      this.form.get('descricao').setValue(this.estoque.descricao);
      this.loader.stopBackground();
    });
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      descricao: ['']
    });

  }

  editar() {
    this.loader.startBackground();
    this.estoque.nome = this.form.get('nome').value;
    this.estoque.descricao = this.form.get('descricao').value;
    this.estoqueService.atualizar(this.estoque).subscribe(
      res => {
        this.router.navigate(['/home/estoque']);
        this.toastr.success('Estoque ' + res.codigo + ' - ' + res.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar estoque: ' + err.error.message);
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
