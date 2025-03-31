export interface ICliente {
  codice: number;
  cognome: string;
  nome: string;
  dataNascita: Date;
  hasFidelityCard: boolean;
  hasDisabilita: boolean;

  idGruppo?: number;
  nomeGruppo?:string;
  numeroPersoneGruppo?:number;

  selezionato?:boolean;
}
