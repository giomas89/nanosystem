import { IPizza } from "./IPizza";

export interface IOrdine {
  codice: number;
  idCliente: number;
  idPizza: IPizza;
  prezzo: number;
  sconto: number;
  prezzoFinale: number;
  dataOra : Date;
}
