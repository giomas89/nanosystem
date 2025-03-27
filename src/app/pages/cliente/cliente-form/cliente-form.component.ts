import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Imports
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Models and Services
import { ICliente } from '../../../models/ICliente';
import { ClienteService } from '../../../services/cliente.service';
import { GruppoService } from '../../../services/gruppo.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss',
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
    provideNativeDateAdapter(),
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatOptionModule,
    ReactiveFormsModule
  ]
})
export class ClienteFormComponent {
  clienteService = inject(ClienteService);
  gruppoService = inject(GruppoService);

  nuovoCliente: ICliente = {
    codice: 0,
    nome: '',
    cognome: '',
    dataNascita: new Date('1990-01-01'),
    hasFidelityCard: false,
    hasDisabilita: false,
    idGruppo: 0,
    dataOraOrdine: new Date()
  };

  aggiungiCliente() {
    if (this.isFormValido()) {
      this.nuovoCliente.codice = this.clienteService.listaClienti().length + 1;
      this.clienteService.listaClienti().unshift({...this.nuovoCliente});
      this.resetForm();
    }
  }

  resetForm() {
    this.nuovoCliente = {
      codice: 0,
      nome: '',
      cognome: '',
      dataNascita: new Date('1990-01-01'),
      hasFidelityCard: false,
      hasDisabilita: false,
      idGruppo: 0,
      dataOraOrdine: new Date()
    };
  }

  isFormValido(): boolean {
    return !!(this.nuovoCliente.nome && this.nuovoCliente.cognome);
  }
}
