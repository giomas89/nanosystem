import { Component, inject } from '@angular/core';
import { CarrelloService } from '../../services/carrello.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
@Component({
  selector: 'app-carrello',
  imports: [CommonModule,
    FormsModule,
    MatDatetimepickerModule,
    MatNativeDateModule,
    MatInputModule],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.scss'
})
export class CarrelloComponent {
  carrelloService = inject(CarrelloService);

}
