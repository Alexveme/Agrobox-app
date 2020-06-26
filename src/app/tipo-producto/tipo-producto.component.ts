import { Component, OnInit, Output } from '@angular/core';
import { PeticionesService } from '../shared/services/peticiones.service';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css']
})
export class TipoProductoComponent implements OnInit {

  arrSubproducts: any;

  listaCompra: any;
  contador: any = {};

  showKiloPrice: boolean;
  showUnidPrice: boolean;
  hideKiloPrice: boolean;
  hideUnidPrice: boolean;

  constructor(private peticionesService: PeticionesService, private router: Router) {

    this.listaCompra = [];

    this.showKiloPrice = false;
    this.showUnidPrice = true;
    this.hideKiloPrice = false;
    this.hideUnidPrice = false;

    registerLocaleData( es );

  }

  async ngOnInit() {
    const peticion = await this.peticionesService.getAllSubproducts();
    this.arrSubproducts = peticion;
  }

  cambiarPrecioKilo() {
    this.showKiloPrice = true;
    this.hideUnidPrice = true;
    this.showUnidPrice = false;
  }

  cambiarPrecioUnidad() {
    this.showUnidPrice = true;
    this.hideKiloPrice = true;
    this.showKiloPrice = false;
  }

  cerrarPantalla() {
    this.router.navigate(['/escoger/agricultor/producto']);
  }

  restarCantidad(id) {
    this.contador[id] -= 1;

    this.listaCompra.map((element, index, array) => {
      if (element.id === id) {
        array[index].cantidad -= 1;
        return array;
      }
    }); 
  }

  sumarCantidad(id, name, price) {

    let cantidad = 1;

    this.contador[id] = (this.contador[id] ? this.contador[id] + cantidad : cantidad);

    if (this.showKiloPrice === true) {
      this.arrSubproducts.forEach((element, index, array) => {
        if (element._id === id) {
          price = array[index].kilo_price;
        }
      });
    }

    let producto = {
      id: id,
      name: name,
      price: price,
      cantidad: this.contador[id]
    }

    if (!this.listaCompra.some(element => element.id === producto.id)) {
      this.listaCompra.push(producto);
    } else {
      this.listaCompra.map((element, index, array) => {
        if (element.id === id)
          array[index].cantidad = this.contador[id];
        return array;
        });
      }
    
  }

  addProductsToCart() {
    this.peticionesService.recogerProductoLista(this.listaCompra);
    this.router.navigate(['/productos/agregados']);
  }

}
