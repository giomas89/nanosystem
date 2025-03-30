import { inject, Injectable, signal } from '@angular/core';
import { ICarrello } from '../models/ICarrello';
import { IPizza } from '../models/IPizza';
import { ICliente } from '../models/ICliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GruppoService } from './gruppo.service';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {
  carrello = signal<ICarrello>({} as ICarrello);
  gruppoService = inject(GruppoService);
  private httpClient = inject(HttpClient);

  constructor() { }

  selezionaCliente(cliente:ICliente){
    // this.carrello().idCliente = cliente.codice;
    this.carrello().cliente = cliente;
    if(!!this.carrello().pizza)
      this.calcoloSconto();
  }

  selezionaPizza(pizza:IPizza){
    // this.carrello().idPizza = pizza.codice;
    this.carrello().pizza = pizza;
    if(!!this.carrello().cliente)
      this.calcoloSconto();
  }

  svuotaCarrello(){
    this.carrello.set({} as ICarrello);
  }


  aggiornaDataOraOrdine() {
    this.calcoloSconto(); // Ricalcola gli sconti
  }

  calcoloSconto(){
    console.log(this.carrello().pizza.prezzo);

    let sconto = 0;
    let motivazioneSconto = '';

    // Se il cliente ha una fidelity card, scontare del 15%
    if(this.carrello().cliente.hasFidelityCard){
      sconto = 15;
      motivazioneSconto = 'Il cliente ha una fidelity card = sconto del 15%';
    }

    // Se è una persona diversamente abile, scontare del 90%
    if(this.carrello().cliente.hasDisabilita){
      sconto = 90;
      motivazioneSconto = 'Il cliente è una persona diversamente abile = sconto del 90%';
    }

    // Sconti di gruppo
  if (this.carrello().cliente.idGruppo) {
    let objGruppo = this.gruppoService.getGruppo(this.carrello().cliente.idGruppo);
    if(objGruppo){
      const numeroPersoneGruppo = objGruppo.arClienti.length;

      // Se fa parte di un gruppo da 15 a 20 persone scontare del 20%
      if (numeroPersoneGruppo >= 15 && numeroPersoneGruppo <= 20) {
        sconto = 20;
        motivazioneSconto = 'Gruppo da 15 a 20 persone = sconto del 20%';
      }

      // Se fa parte di un gruppo da 21 a 25 persone scontare del 30%
      if (numeroPersoneGruppo >= 21 && numeroPersoneGruppo <= 25) {
        sconto = 30;
        motivazioneSconto = 'Gruppo da 21 a 25 persone = sconto del 30%';
      }

      // Se fa parte di un gruppo con più di 25 persone scontare del 50%
      if (numeroPersoneGruppo > 25) {
        sconto = 50;
        motivazioneSconto = 'Gruppo con più di 25 persone = sconto del 50%';
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

    //Se il cliente ha 60 o più anni, si applica lo sconto del 70%
    const oggi = new Date();
    const settantaAnniFa = new Date(oggi.getFullYear() - 60, oggi.getMonth(), oggi.getDate());
    if (this.carrello().cliente.dataNascita <= settantaAnniFa) {
      sconto = 70;
      motivazioneSconto = 'Il cliente ha 60 o più anni = sconto del 70%';
    }

    //Se non è stato già applicato lo sconto di gruppo, scontare del 50% se chi ordina è un bambino sotto i 4 anni, del 20% se è sotto i 12 anni
    if(sconto === 0){
      const quattroAnniFa = new Date(oggi.getFullYear() - 4, oggi.getMonth(), oggi.getDate());
      const dodiciAnniFa = new Date(oggi.getFullYear() - 12, oggi.getMonth(), oggi.getDate());

      if(this.carrello().cliente.dataNascita<= quattroAnniFa){
        sconto = 50;
        motivazioneSconto = 'Il cliente ha meno di 4 anni = sconto del 50%';
      }
      else if(this.carrello().cliente.dataNascita <= dodiciAnniFa){
        sconto = 20;
        motivazioneSconto = 'Il cliente ha meno di 12 anni = sconto del 20%';
      }
    }

    // A questo punto passo lo sconto alla funzione di calcolo del totale
    this.carrello().sconto = sconto;
    this.carrello().motivazioneSconto = motivazioneSconto;
    this.calcoloTotale();
  }

  calcoloTotale(){
    let scontoPerc = this.carrello().sconto / 100; // Calcola la percentuale di sconto (es. 0.10 per 10%)
    this.carrello().importoSconto = Math.round(this.carrello().pizza.prezzo * scontoPerc); // Calcola l'importo dello sconto
    let totale = this.carrello().pizza.prezzo - this.carrello().importoSconto; // Calcola il totale sottraendo l'importo dello sconto

    //Il prezzo totale della pizza non può scendere sotto i 5€
    if(totale < 5){
      totale = 5;
      this.carrello().motivazioneSconto += ",<br>ma il prezzo totale non può scendere sotto i 5€";
    }

    this.carrello().totale = totale;
  }


  getSconti(): Observable<string> {
    return this.httpClient.get('assets/scontistica.txt', { responseType: 'text' });
  }
      // this.httpClient.get('assets/changelog.txt', {responseType: 'text'}).subscribe(data => {
    //   var md = marked.setOptions({mangle:false,headerIds:false});
    //   this.content = md.parse(data);
    // });

}
