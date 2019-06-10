import { TipoMovimentacaoEstoqueEnum } from './enums/TipoMovimentacaoEstoqueEnum';
import { Produto } from './Produto';
import { Unidade } from './Unidade';


export class Estoque {
  codigo: number;
  produto: Produto;
  unidade: Unidade;
  quantidade: number;
  quantidadeMinima: number;
  lote: string;
  tipo: TipoMovimentacaoEstoqueEnum;
  dataValidade: Date;
  dataRegistro: Date;
}
