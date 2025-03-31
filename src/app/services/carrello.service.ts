import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ICarrello } from '../models/ICarrello';
import { IPizza } from '../models/IPizza';
import { ICliente } from '../models/ICliente';

import { GruppoService } from './gruppo.service';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  carrello = signal<ICarrello>({} as ICarrello);
  gruppoService = inject(GruppoService);
  clienteService = inject(ClienteService);
  private httpClient = inject(HttpClient);

  constructor() { }

  selezionaCliente(cliente: ICliente) {
    this.carrello().cliente = cliente;
    // if (this.carrello().pizza)
      this.calcoloTotale();
  }

  selezionaPizza(pizza: IPizza) {
    this.carrello().pizza = pizza;
    // if (this.carrello().cliente)
      this.calcoloTotale();
  }

  svuotaCarrello() {
    this.carrello.set({} as ICarrello);
  }


  calcoloSconto() {
    let sconto = 0;
    let motivazioneSconto = '';

    if (this.carrello().cliente) { // Verifica se cliente esiste
      // Se il cliente ha una fidelity card, scontare del 15%
      if (this.carrello().cliente.hasFidelityCard) {
        if (15 > sconto) {
          sconto = 15;
          motivazioneSconto = 'Il cliente ha una fidelity card = sconto del 15%';
        }
      }

      // Se è una persona diversamente abile, scontare del 90%
      if (this.carrello().cliente.hasDisabilita) {
        if (90 > sconto) {
          sconto = 90;
          motivazioneSconto = 'Il cliente è una persona diversamente abile = sconto del 90%';
        }
      }

      // Sconti di gruppo
      if (this.carrello().cliente.idGruppo) {
        let objGruppo = this.gruppoService.getGruppo(this.carrello().cliente.idGruppo);
        if (objGruppo) {
          const numeroPersoneGruppo = objGruppo.arClienti.length;

          // Se fa parte di un gruppo da 15 a 20 persone scontare del 20%
          if (numeroPersoneGruppo >= 15 && numeroPersoneGruppo <= 20) {
            if (20 > sconto) {
              sconto = 20;
              motivazioneSconto = 'Gruppo da 15 a 20 persone = sconto del 20%';
            }
          }

          // Se fa parte di un gruppo da 21 a 25 persone scontare del 30%
          if (numeroPersoneGruppo >= 21 && numeroPersoneGruppo <= 25) {
            if (30 > sconto) {
              sconto = 30;
              motivazioneSconto = 'Gruppo da 21 a 25 persone = sconto del 30%';
            }
          }

          // Se fa parte di un gruppo con più di 25 persone scontare del 50%
          if (numeroPersoneGruppo > 25) {
            if (50 > sconto) {
              sconto = 50;
              motivazioneSconto = 'Gruppo con più di 25 persone = sconto del 50%';
            }
          }
        }
      }

      //Se il cliente ha 60 o più anni, si applica lo sconto del 70%
      if (this.clienteService.calcolaEta(this.carrello().cliente.dataNascita) >= 60) {
        if (70 > sconto) {
          sconto = 70;
          motivazioneSconto = 'Il cliente ha 60 o più anni = sconto del 70%';
        }
      }

      //Se non è stato già applicato lo sconto di gruppo, scontare del 50% se chi ordina è un bambino sotto i 4 anni, del 20% se è sotto i 12 anni
      if (sconto === 0) {
        if (this.clienteService.calcolaEta(this.carrello().cliente.dataNascita) <= 4) {
          if (50 > sconto) {
            sconto = 50;
            motivazioneSconto = 'Il cliente ha meno di 4 anni = sconto del 50%';
          }
        }
        if (this.clienteService.calcolaEta(this.carrello().cliente.dataNascita) <= 12) {
          if (20 > sconto) {
            sconto = 20;
            motivazioneSconto = 'Il cliente ha meno di 12 anni = sconto del 20%';
          }
        }
      }

      // Se non sono stati applicati altri sconti, e l'ordine arriva entro le 20:00, scontare del 10%.
      // Lo stesso sconto si applica per il weekend indipendentemente dall'ora
      if (sconto === 0) {
        const dataOrdine = this.carrello().dataOra;
        if (dataOrdine) {
          const ora = dataOrdine.getHours();
          const giornoSettimana = dataOrdine.getDay();

          const isWeekend = giornoSettimana === 0 || giornoSettimana === 6;
          if (ora < 20 || isWeekend) {
            sconto = 10;
            motivazioneSconto = 'Ordine entro le 20:00 o nel weekend = sconto del 10%';
          }
        }
      }
    }

    // A questo punto passo lo sconto alla funzione di calcolo del totale
    this.carrello().sconto = sconto;
    this.carrello().motivazioneSconto = motivazioneSconto;
  }

  calcoloTotale() {
    this.calcoloSconto();

    let totale  = 0;
    if (this.carrello().pizza){
      let scontoPerc = this.carrello().sconto / 100; // Calcola la percentuale di sconto (es. 0.10 per 10%)
      this.carrello().importoSconto = Math.floor(this.carrello().pizza.prezzo * scontoPerc * 100) / 100; // Calcola l'importo dello sconto
      totale = this.carrello().pizza.prezzo - this.carrello().importoSconto; // Calcola il totale sottraendo l'importo dello sconto

      //Il prezzo totale della pizza non può scendere sotto i 5€
      if (totale < 5) {
        totale = 5;
        this.carrello().motivazioneSconto += ",<br><b>ma il prezzo totale non può scendere sotto i 5€</b>";
      }
    }

    this.carrello().totale = totale;
  }

  getSconti(): Observable<string> {
    return this.httpClient.get('assets/scontistica.txt', { responseType: 'text' });
  }
}
