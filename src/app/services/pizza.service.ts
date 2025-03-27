import { Injectable, signal } from '@angular/core';
import { IPizza } from '../models/IPizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  listaPizze = signal<IPizza[]>([]);

  constructor() { }

  inizializzaListaPizze(){
    const pizze: IPizza[] = [
      {
        codice: 1,
        nome: "Margherita Classica",
        prezzo: 6.00,
      },
      {
        codice: 2,
        nome: "Marinara Tradizionale",
        prezzo: 5.50,
      },
      {
        codice: 3,
        nome: "Quattro Formaggi",
        prezzo: 8.00,
      },
      {
        codice: 4,
        nome: "Prosciutto e Funghi",
        prezzo: 7.50,
      },
      {
        codice: 5,
        nome: "Salame Piccante",
        prezzo: 7.00,
      },
      {
        codice: 6,
        nome: "Capricciosa",
        prezzo: 9.00,
      },
      {
        codice: 7,
        nome: "Vegetariana",
        prezzo: 7.50,
      },
      {
        codice: 8,
        nome: "Diavola",
        prezzo: 8.50,
      },
      {
        codice: 9,
        nome: "Frutti di Mare",
        prezzo: 11.00,
      },
      {
        codice: 10,
        nome: "Pizza Gourmet con Tartufo",
        prezzo: 12.00,
      },
    ];

    this.listaPizze.set(pizze);
  }
}
