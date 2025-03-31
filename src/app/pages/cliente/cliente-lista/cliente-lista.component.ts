import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Importa MatDialog e MatDialogModule

import { FormsModule } from '@angular/forms';

import { ClienteService } from '../../../services/cliente.service';
import { CarrelloService } from '../../../services/carrello.service';
import { GruppoService } from '../../../services/gruppo.service';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';

@Component({
  selector: 'app-cliente-lista',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './cliente-lista.component.html',
  styleUrl: './cliente-lista.component.scss'
})
export class ClienteListaComponent {
  clienteService = inject(ClienteService);
  carrelloService = inject(CarrelloService);
  gruppoService = inject(GruppoService);

  ngOnInit(){
    this.clienteService.inizializzaListaClienti();
  }
}
