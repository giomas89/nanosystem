import { Component, inject, OnInit } from '@angular/core';
import { CarrelloService } from '../../services/carrello.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { GruppoService } from '../../services/gruppo.service';
import { ClienteService } from '../../services/cliente.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carrello',
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    DatePipe
  ],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.scss',
})
export class CarrelloComponent implements OnInit {
  carrelloService = inject(CarrelloService);
  gruppoService = inject(GruppoService);
  clienteService = inject(ClienteService);

  selectedTime: string | null = null;
  selectedDate: Date | null = null;
  datePipe = inject(DatePipe);

  ngOnInit() {
    // Inizializzo data e ora del carrelo con data/ora attuale se non definito
    if (this.carrelloService.carrello().dataOra === undefined) {
      this.carrelloService.carrello().dataOra = new Date();
    }
    // Appoggio la data e l'ora attuali nelle proprietà "separate" per data e ora
    this.selectedDate = this.carrelloService.carrello().dataOra;
    this.selectedTime = this.datePipe.transform(this.carrelloService.carrello().dataOra, 'HH:mm');
  }

  // Richiamo la funzione di aggiornamento di data e ora quando l'input della data viene triggerato
  aggiornaData() {
    console.log('aggiorna data');
    this.aggiornaDataOraCarrello();
  }

  // Richiamo la funzione di aggiornamento di data e ora quando l'input della data viene triggerato
  aggiornaOra() {
    console.log('aggiorna ora');
    this.aggiornaDataOraCarrello();
  }

  // Ricostruisco dataOra del carrello riunendo data e orario inseriti sugli input
  aggiornaDataOraCarrello() {
    if (this.selectedDate && this.selectedTime) {

      const timeParts = this.selectedTime.split(':');
      if (timeParts.length === 2 && !isNaN(parseInt(timeParts[0], 10)) && !isNaN(parseInt(timeParts[1], 10))) {
        this.carrelloService.carrello().dataOra = new Date(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth(),
          this.selectedDate.getDate(),
          parseInt(timeParts[0], 10),
          parseInt(timeParts[1], 10)
        );

        console.log('dataOra:',this.carrelloService.carrello().dataOra);
        this.carrelloService.calcoloTotale();
      } else {
        console.error('Invalid time format:', this.selectedTime);
      }
    } else {
      console.error('selectedDate or selectedTime is null or undefined');
    }
  }
}
