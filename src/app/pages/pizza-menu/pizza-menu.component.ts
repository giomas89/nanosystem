import { Component, inject, signal } from '@angular/core';
import { PizzaService } from '../../services/pizza.service';
import { CommonModule } from '@angular/common';
import { CarrelloService } from '../../services/carrello.service';

@Component({
  selector: 'app-pizza-menu',
  imports: [CommonModule],
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
