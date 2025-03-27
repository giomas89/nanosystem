import { Component } from '@angular/core';

import { ClienteListaComponent } from "./pages/cliente/cliente-lista/cliente-lista.component";
import { ClienteFormComponent } from "./pages/cliente/cliente-form/cliente-form.component";
import { PizzaMenuComponent } from './pages/pizza-menu/pizza-menu.component';
import { CarrelloComponent } from './pages/carrello/carrello.component';

@Component({
  selector: 'app-root',
  imports: [ClienteListaComponent, ClienteFormComponent, PizzaMenuComponent,CarrelloComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pizza-ordine-app';
}
