import { Component, inject, signal } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { CommonModule } from '@angular/common';
import { CarrelloService } from '../../services/carrello.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pizza-menu',
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './pizza-menu.component.html',
  styleUrl: './pizza-menu.component.scss'
})
export class PizzaMenuComponent {
  pizzaService = inject(PizzaService);
  carrelloService = inject(CarrelloService);

  ngOnInit(){
    this.pizzaService.inizializzaListaPizze();
  }
}
