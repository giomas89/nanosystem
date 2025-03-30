import { ICliente } from "./ICliente"
import { IPizza } from "./IPizza"

export interface ICarrello {
    // idCliente : number,
    // idPizza : number,
    pizza:IPizza,
    cliente:ICliente,
    sconto:number,
    importoSconto:number,
    totale:number
    motivazioneSconto:string
    dataOra : Date;
  }
