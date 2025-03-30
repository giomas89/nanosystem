import { ICliente } from "./ICliente";

export interface IGruppo {
  codice: number;
  nome: string;
  arClienti: ICliente[];
  numeroPersone?: number;
}
