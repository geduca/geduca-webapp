import { Fornecedor } from 'src/app/model/Fornecedor';
import { Endereco } from './Endereco';

export class Produto {
   codigo: number;
   nome: string;
   descricao: string;
   quantidade: number;
   quantidadeMinima: number;
   dataValidade: Date;
   fornecedores: Fornecedor[];
}
