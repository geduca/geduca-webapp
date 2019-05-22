import { Produto } from './Produto';
import { Unidade } from './Unidade';


export class EstoqueProduto {
  codigo: number;
  produto: Produto;
  unidade: Unidade;
  quantidade: number;
  quantidadeMinima: number;
  dataRegistro: Date;
}
