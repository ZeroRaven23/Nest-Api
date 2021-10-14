import {  Injectable } from "@nestjs/common";

@Injectable()
export class CpfVeri {
    primeiroDigito: number;
    segundoDigito: number;
    totalP: number;
    totalS: number;
  
    cpfTamanho(cpf: string): boolean {
      if (cpf.length === 11) {
        return true;
      }
      return false;
    }
  
    separador(cpf: string): Array<string> {
      return cpf.split("");
    }
    digito(cpf: string): void {
      const cpfSeparado = this.separador(cpf);
      this.primeiroDigito = parseInt(cpfSeparado[9]);
      this.segundoDigito = parseInt(cpfSeparado[10]);
    }
    Acumulador(cpf: string, index: number, indexFinal: number): number {
      const cpfSeparado: Array<any> = this.separador(cpf);
      let acumulador: number = 0;
      for (let i = 0; i >= 0; i++) {
        acumulador += cpfSeparado[i] * index;
        index--;
        if (i == indexFinal) {
          break;
        }
      }
      return acumulador;
    }
  
    resultado(cpf: string): void {
      const acuP: number = this.Acumulador(cpf, 10, 8);
      const calculoP: number = (acuP * 10) % 11;
      this.totalP = calculoP === 10 ? 0 : calculoP; //? se   //: senao
  
      const acuS: number = this.Acumulador(cpf, 11, 9);
      const calculoS: number = (acuS * 10) % 11;
      this.totalS = calculoS === 10 ? 0 : calculoS;
    }
    verificar(cpf: string): boolean {
      if (this.cpfTamanho(cpf)) {
        this.digito(cpf);
        this.resultado(cpf);
        if (
          this.totalP === this.primeiroDigito &&
          this.totalS === this.segundoDigito
        ) {
          return true;
        }
      }
      return false;
    }
  }