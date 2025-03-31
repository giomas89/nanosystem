import { ICliente } from "./ICliente"
import { IPizza } from "./IPizza"

export interface ICarrello {
    // idCliente : number,
    // idPizza : number,
    cliente: ICliente;
    pizza: IPizza;
    sconto:number,
    importoSconto:number,
    totale:number
    motivazioneSconto:string
    dataOra : Date;
  }
