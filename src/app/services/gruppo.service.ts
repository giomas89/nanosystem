import { inject, Injectable, signal } from '@angular/core';
import { IGruppo } from '../models/IGruppo';
import { ICliente } from '../models/ICliente';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class GruppoService {
  listaGruppi = signal<IGruppo[]>([]);
  clienteService = inject(ClienteService);

  // Generazione tramite supporto di AI di una lista di gruppi
  constructor() {
      let arGruppi: IGruppo[] = [
        {
          codice: 1,
          nome: 'Calcetto',
          arClienti: this.generaClienti(1, 'Calcetto', 13),
        },
        {
          codice: 2,
          nome: 'Orchestra',
          arClienti: this.generaClienti(2, 'Orchestra', 60),
        },
        {
          codice: 3,
          nome: 'Consiglio Amministrazione',
          arClienti: this.generaClienti(3, 'Amministrazione', 23),
        },
        {
          codice: 4,
          nome: 'Rimpatriata di Classe',
          arClienti: this.generaClienti(4, 'Classe', 18),
        },
        {
          codice: 5,
          nome: 'Condomino',
          arClienti: this.generaClienti(5, 'Condomino', 16),
        },
      ];
      this.listaGruppi.set(arGruppi);
    }

    // Metodo definito da AI per generare clienti in modo dinamico (solo per riempire gli array)
    generaClienti(gruppocodice: number, prefissoGruppo: string, conteggio: number): ICliente[] {
      return Array.from({ length: conteggio }, (_, indice) => {
        const etaMinima = 18;
        const etaMassima = 70;
        const etaCasuale = Math.floor(Math.random() * (etaMassima - etaMinima + 1)) + etaMinima;

        const annoCorrente = new Date().getFullYear();
        const annoNascita = annoCorrente - etaCasuale;

        // Genera un mese e un giorno casuali
        const meseNascita = Math.floor(Math.random() * 12);
        const giornoNascita = Math.floor(Math.random() * 28) + 1; // Assumiamo un massimo di 28 giorni per semplificare

        const dataNascita = new Date(annoNascita, meseNascita, giornoNascita);

        return {
          codice: indice + 1,
          nome: `Nome ${prefissoGruppo} ${indice + 1}`,
          cognome: `Cognome ${prefissoGruppo} ${indice + 1}`,
          dataNascita: dataNascita,
          hasFidelityCard: Math.random() > 0.5,
          hasDisabilita: Math.random() < 0.1,
          idGruppo: gruppocodice,
        };
      });
    }

    // Funzione che restituisce l'oggetto gruppo per poter mostrare i suoi dati a video
    getGruppo(idGruppo?: number): IGruppo | undefined {
      let objGruppo;
      if(idGruppo){
        objGruppo = this.listaGruppi().find(gruppo => gruppo.codice === idGruppo);
      }
      return objGruppo;
    }

    // Funzionalità per aggiungere il nuovo cliente inserito ad un gruppo
    addUserToGroup(){
      let gruppo = this.getGruppo(this.clienteService.clienteAggiunto().idGruppo);
      gruppo?.arClienti.push(this.clienteService.clienteAggiunto());
    }
  }
