import { Injectable, signal } from '@angular/core';
import { IPizza } from '../models/IPizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  listaPizze = signal<IPizza[]>([]);

  constructor() { }

  inizializzaListaPizze() {
    const pizze: IPizza[] = [
      {
        codice: 1,
        nome: "Margherita Classica",
        prezzo: 6.00,
        descrizione: "Pomodoro, mozzarella e basilico fresco."
      },
      {
        codice: 2,
        nome: "Marinara Tradizionale",
        prezzo: 5.50,
        descrizione: "Pomodoro, aglio, origano e olio extravergine d'oliva."
      },
      {
        codice: 3,
        nome: "Quattro Formaggi",
        prezzo: 8.00,
        descrizione: "Mozzarella, gorgonzola, fontina e parmigiano."
      },
      {
        codice: 4,
        nome: "Prosciutto e Funghi",
        prezzo: 7.50,
        descrizione: "Pomodoro, mozzarella, prosciutto cotto e funghi champignon."
      },
      {
        codice: 5,
        nome: "Salame Piccante",
        prezzo: 7.00,
        descrizione: "Pomodoro, mozzarella e salame piccante calabrese."
      },
      {
        codice: 6,
        nome: "Capricciosa",
        prezzo: 9.00,
        descrizione: "Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi e olive."
      },
      {
        codice: 7,
        nome: "Vegetariana",
        prezzo: 7.50,
        descrizione: "Pomodoro, mozzarella e verdure di stagione grigliate."
      },
      {
        codice: 8,
        nome: "Diavola",
        prezzo: 8.50,
        descrizione: "Pomodoro, mozzarella e salame piccante con peperoncino."
      },
      {
        codice: 9,
        nome: "Frutti di Mare",
        prezzo: 11.00,
        descrizione: "Pomodoro, mozzarella e frutti di mare misti."
      },
      {
        codice: 10,
        nome: "Pizza Gourmet con Tartufo",
        prezzo: 12.00,
        descrizione: "Mozzarella, crema di tartufo, funghi porcini e scaglie di parmigiano."
      },
    ];

    this.listaPizze.set(pizze);
  }
}
