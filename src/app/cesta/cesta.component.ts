import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { PeticionesService } from '../shared/services/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css']
})
export class CestaComponent implements OnInit {

  contador: any = {};
  totalPrecioItem: any = {};

  arrCesta: any;
  numProductosCesta: Number;
  totalCesta: Number;

  constructor(private peticionesService: PeticionesService, private router: Router) {

    this.totalPrecioItem = 0;
    this.arrCesta = [];
    this.totalCesta = 0;

    registerLocaleData( es );

  }

  ngOnInit(): void {

    this.arrCesta = this.peticionesService.arrCesta;

    if (this.arrCesta.length > 0)
      this.contarProductosCesta();

    this.sumarTotalCesta();
    
  }

  contarProductosCesta() {
    let sum = 0;
    if (this.arrCesta.length === 1) {
      this.arrCesta.forEach(element => {
        this.numProductosCesta = element.cantidad;
      });
    } else {
      this.arrCesta.forEach(element => {
        sum += element.cantidad;
      });
      this.numProductosCesta = sum;
    }
  }

  restarCantidad(id) {
    this.arrCesta.map((element, index, array) => {
      if (element.id === id) {
        array[index].cantidad -= 1;
        this.totalPrecioItem = array[index].cantidad * array[index].price;
        return array;
      }
    });
    this.sumarTotalCesta();
  }

  sumarCantidad(id) {
    this.arrCesta.map((element, index, array) => {
      if (element.id === id) {
        array[index].cantidad += 1;
        this.totalPrecioItem = array[index].cantidad * array[index].price;
        return array;
      }
    });
    this.sumarTotalCesta();
  }

  sumarTotalCesta() {
    let sum = 0;
    this.arrCesta.forEach(element => {
      let total = element.cantidad * element.price;
      sum += total;
    });
    this.totalCesta = sum;
  }

  borrarItemCesta(id) {
    this.arrCesta.map((element, index, array) => {
      if (element.id === id) {
        array.splice(index, 1);
        return array;
      }
    });
    this.sumarTotalCesta();
  }

  async finalizarCompra(total) {
    
    const order = {
      amount: total,
      order_date: new Date(),
      products: this.arrCesta
    };

    const peticion = await this.peticionesService.createOrder(order);

    this.arrCesta.splice(0, this.arrCesta.length);

    this.router.navigate(['/orden/confirmacion']);
    
  }

}
