import { Fornecedor } from 'src/app/model/Fornecedor';

export class Produto {
  codigo: number;
  nome: string;
  descricao: string;
  quantidadeMinima: number;
  marca: string;
  fornecedor: Fornecedor;
}
