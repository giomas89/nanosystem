import { Component, inject } from '@angular/core';
import { CarrelloService } from '../../services/carrello.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrello',
  imports: [CommonModule],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.scss'
})
export class CarrelloComponent {
  carrelloService = inject(CarrelloService);

}
