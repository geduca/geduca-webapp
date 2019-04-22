import { Endereco } from './Endereco';
import { SexoEnum } from './enums/SexoEnum';

export class Pessoa {
  codigo: number;
  nome: string;
  ativo: boolean;
  cpf: string;
  telefone: string;
  celular: string;
  endereco: Endereco;
  sexo: SexoEnum;
  dataNascimento: Date;
}
