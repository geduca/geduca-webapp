import { FornecedorService } from './../../../service/fornecedor.service';
import { Fornecedor } from './../../../model/Fornecedor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-editar-fornecedor',
  templateUrl: './editar-fornecedor.component.html'
})
export class EditarFornecedorComponent implements OnInit {

  fornecedor: Fornecedor;
  fornecedorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    const codigo = this.activatedRoute.snapshot.params.codigo;
    this.fornecedorService.buscaPeloCodigo(codigo).subscribe(res => {
      this.loader.startBackground();
      this.fornecedor = res;
      this.fornecedorForm.get('nome').setValue(this.fornecedor.nome);
      this.fornecedorForm.get('cpfCnpj').setValue(this.fornecedor.cpfCnpj);
      this.fornecedorForm.get('email').setValue(this.fornecedor.email);
      this.fornecedorForm.get('responsavel').setValue(this.fornecedor.responsavel);
      this.fornecedorForm.get('telefone').setValue(this.fornecedor.telefone);
      this.fornecedorForm.get('cep').setValue(this.fornecedor.endereco.cep);
      this.fornecedorForm.get('logradouro').setValue(this.fornecedor.endereco.logradouro);
      this.fornecedorForm.get('numero').setValue(this.fornecedor.endereco.numero);
      this.fornecedorForm.get('complemento').setValue(this.fornecedor.endereco.complemento);
      this.fornecedorForm.get('bairro').setValue(this.fornecedor.endereco.bairro);
      this.fornecedorForm.get('cidade').setValue(this.fornecedor.endereco.cidade);
      this.fornecedorForm.get('estado').setValue(this.fornecedor.endereco.cidade);

      this.loader.stopBackground();
    });
    this.fornecedorForm = this.formBuilder.group({
      nome: [''], cpf: [''], email: [''],
      telefone: [''], responsavel: [''], celular: [''], cep: [''], logradouro: [''], numero: [''], complemento: [''],
      bairro: [''], cidade: [''], estado: ['']
    });

  }

  editar() {
    this.loader.startBackground();

    this.fornecedor.nome = this.fornecedorForm.get('nome').value;
    this.fornecedor.cpfCnpj = this.fornecedorForm.get('cpfCnpj').value;
    this.fornecedor.email = this.fornecedorForm.get('email').value;
    this.fornecedor.telefone = this.fornecedorForm.get('telefone').value;
    this.fornecedor.responsavel = this.fornecedorForm.get('responsavel').value;
    this.fornecedor.endereco.cep = this.fornecedorForm.get('cep').value;
    this.fornecedor.endereco.logradouro = this.fornecedorForm.get('logradouro').value;
    this.fornecedor.endereco.numero = this.fornecedorForm.get('numero').value;
    this.fornecedor.endereco.complemento = this.fornecedorForm.get('complemento').value;
    this.fornecedor.endereco.bairro = this.fornecedorForm.get('bairro').value;
    this.fornecedor.endereco.cidade = this.fornecedorForm.get('cidade').value;
    this.fornecedor.endereco.estado = this.fornecedorForm.get('estado').value;

    this.fornecedorService.atualizar(this.fornecedor).subscribe(
      res => {
        this.router.navigate(['/home/fornecedor']);
        this.toastr.success('Fornecedor ' + res.nome + ' editado com sucesso!');
        this.loader.stopBackground();
      },
      err => {
        this.toastr.error('Erro ao editar Fornecedor: ' + err.error.message);
        this.loader.stopBackground();
      }
    );
  }

}
