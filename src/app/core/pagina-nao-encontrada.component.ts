import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
<div class="app flex-row align-items-center">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="clearfix">
          <h1 class="float-left display-3 mr-4">403</h1>
          <h4 class="pt-3">Acesso Negado</h4>
          <p class="text-muted">Você não possui permissão para acessar esta página.</p>
        </div>
        <div class="row">
              <div class="col-md-12 text-center">
              <a class="btn btn-info" href=# routerLink="['']">Página Inicial</a>
              </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `,
  styles: []
})
export class PaginaNaoEncontradaComponent {

}
