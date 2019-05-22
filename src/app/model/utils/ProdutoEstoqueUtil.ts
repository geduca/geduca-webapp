import { Produto } from './../Produto';
import { Unidade } from './../Unidade';

export class EstoqueProdutoUtil {
  produto: Produto;
  unidade: Unidade;
  quantidade: number;
  quantidadeMinima: number;
  dataRegistro: Date;
}
