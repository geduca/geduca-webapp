import { Aluno } from './Aluno';
import { ResultadoIMCEnum } from './enums/ResultadoIMCEnum';

export class RegistroNutricional {
  codigo: number;
  aluno: Aluno;
  peso: number;
  altura: number;
  imc: number;
  resultado: ResultadoIMCEnum;
  dataRegistro: Date;
}
