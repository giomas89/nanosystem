import { Injectable, signal } from '@angular/core';
import { ICliente } from '../models/ICliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteAggiunto = signal<ICliente>({} as ICliente);
  clienteSelezionato = signal<ICliente>({} as ICliente);
  listaClienti = signal<ICliente[]>([]);

  // listaClientiFiltrati = signal<ICliente[]>([]);
  searchTerm = signal<string>('');


  constructor() { }

  inizializzaListaClienti(){
    let arClienti: ICliente[] = [
      {
        codice: 1,
        nome: "Marco",
        cognome: "Rossi",
        dataNascita: new Date(1985, 5, 15),
        hasFidelityCard: false,
        hasDisabilita: false,
        idGruppo: 1,
      },
      {
        codice: 2,
        nome: "Elena",
        cognome: "Bianchi",
        dataNascita: new Date(1992, 8, 22),
        hasFidelityCard: false,
        hasDisabilita: true,
        idGruppo: 2,
      },
      {
        codice: 3,
        nome: "Giovanni",
        cognome: "Verdi",
        dataNascita: new Date(1978, 3, 7),
        hasFidelityCard: true,
        hasDisabilita: false,
        idGruppo: 3,
      },
      {
        codice: 4,
        nome: "Sofia",
        cognome: "Ferrari",
        dataNascita: new Date(1990, 11, 30),
        hasFidelityCard: true,
        hasDisabilita: false,
        idGruppo: 1,
      },
      {
        codice: 5,
        nome: "Antonio",
        cognome: "Esposito",
        dataNascita: new Date(1965, 6, 12),
        hasFidelityCard: false,
        hasDisabilita: false,
        idGruppo: 2,
      },
      {
        codice: 6,
        nome: "Laura",
        cognome: "Romano",
        dataNascita: new Date(1988, 1, 25),
        hasFidelityCard: true,
        hasDisabilita: true,
        idGruppo: 3,
      },
      {
        codice: 7,
        nome: "Matteo",
        cognome: "Colombo",
        dataNascita: new Date(1995, 9, 8),
        hasFidelityCard: false,
        hasDisabilita: false,
        idGruppo: 1,
      },
      {
        codice: 8,
        nome: "Chiara",
        cognome: "Ricci",
        dataNascita: new Date(1982, 4, 3),
        hasFidelityCard: true,
        hasDisabilita: false,
        idGruppo: 2,
      },
      {
        codice: 9,
        nome: "Roberto",
        cognome: "Moretti",
        dataNascita: new Date(1970, 7, 16),
        hasFidelityCard: false,
        hasDisabilita: true,
        idGruppo: 3,
      },
      {
        codice: 10,
        nome: "Valentina",
        cognome: "Conti",
        dataNascita: new Date(1993, 0, 20),
        hasFidelityCard: true,
        hasDisabilita: false,
        idGruppo: 1,
      },
    ];

    this.listaClienti.set(arClienti);
  }

  calcolaEta(dateOfBirth: Date): number {
    if (!dateOfBirth) return 0;

    const oggi = new Date();
    let eta = oggi.getFullYear() - dateOfBirth.getFullYear();
    const mese = oggi.getMonth() - dateOfBirth.getMonth();

    if (mese < 0 || (mese === 0 && oggi.getDate() < dateOfBirth.getDate())) {
      eta--;
    }

    return eta;
  }

  // filtraClienti() {
  //   const filteredClients = this.listaClienti();
  //   if (this.searchTerm){
  //     this.listaClienti().filter(cliente =>
  //       cliente.nome.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
  //       cliente.cognome.toLowerCase().includes(this.searchTerm().toLowerCase())
  //     );
  //   }
  //   this.listaClientiFiltrati.set(filteredClients);
  // }

}
