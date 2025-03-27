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
import { ClienteService } from '../../../services/cliente.service';
import { CarrelloService } from '../../../services/carrello.service';

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
    MatIconModule,],
  templateUrl: './cliente-lista.component.html',
  styleUrl: './cliente-lista.component.scss'
})
export class ClienteListaComponent {
  clienteService = inject(ClienteService);
  carrelloService = inject(CarrelloService);

  ngOnInit(){
    this.clienteService.inizializzaListaClienti();
  }

  calcolaEta(dateOfBirth: Date): number {
    if (!dateOfBirth) {
      return 0; // O restituisci un valore predefinito come 0 se la data di nascita non è definita
    }

    const ageDifMs = Date.now() - new Date(dateOfBirth).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
