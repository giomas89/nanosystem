import { Component, inject, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// Material Imports
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

// Models and Services
import { ICliente } from '../../../models/ICliente';
import { ClienteService } from '../../../services/cliente.service';
import { GruppoService } from '../../../services/gruppo.service';
import { CarrelloService } from '../../../services/carrello.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss',
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    provideNativeDateAdapter(),
  ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule
  ],
})
export class ClienteFormComponent {
  clienteService = inject(ClienteService);
  gruppoService = inject(GruppoService);
  fb = inject(FormBuilder);
  clienteForm: FormGroup;

  scontiText: string = '';
  carrelloService = inject(CarrelloService);

  constructor() {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      dataNascita: [new Date('01/01/1900'), Validators.required],
      hasFidelityCard: [false],
      hasDisabilita: [false],
      idGruppo: [0],
    });
  }

  ngOnInit(): void {
    // this.carrelloService.getSconti().subscribe((text) => {
    //   console.log('text:',text);
    //   this.scontiText = text;
    // });
  }


  aggiungiCliente() {
    if (this.clienteForm.valid) {
      const nuovoCliente = this.clienteForm.value as ICliente;
      nuovoCliente.codice = this.clienteService.listaClienti().length + 1;
      nuovoCliente.dataOraOrdine = new Date(); // Imposta la data e l'ora dell'ordine
      this.clienteService.clienteAggiunto.set(nuovoCliente);

      if (nuovoCliente.idGruppo && nuovoCliente.idGruppo > 0) {
        this.gruppoService.addUserToGroup(); // Assicurati che questo metodo funzioni correttamente
      }

      this.clienteService.listaClienti().unshift({ ...nuovoCliente });

      console.log('Cliente aggiunto:', nuovoCliente);
      console.log('Gruppo', this.gruppoService.getGruppo(nuovoCliente.idGruppo));
      this.clienteForm.reset();
      this.clienteForm.markAsUntouched(); // Aggiungi questa riga
    }
  }
}
