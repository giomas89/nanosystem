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

  constructor() {
      let arGruppi: IGruppo[] = [
        {
          codice: 1,
          nome: 'Calcetto',
          arClienti: this.generaClienti(1, 'Calcetto', 10),
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
      ];
      this.listaGruppi.set(arGruppi);
    }

    // Metodo per generare clienti in modo dinamico
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

    getGruppo(idGruppo?: number): IGruppo | undefined {
      let objGruppo;
      if(idGruppo){
        objGruppo = this.listaGruppi().find(gruppo => gruppo.codice === idGruppo);
      }
      return objGruppo;
    }

    addUserToGroup(){
      let gruppo = this.getGruppo(this.clienteService.clienteAggiunto().idGruppo);
      gruppo?.arClienti.push(this.clienteService.clienteAggiunto());
    }
  }
