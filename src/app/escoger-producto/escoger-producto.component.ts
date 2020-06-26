import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../shared/services/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escoger-producto',
  templateUrl: './escoger-producto.component.html',
  styleUrls: ['./escoger-producto.component.css']
})
export class EscogerProductoComponent implements OnInit {

  arrProducts: any;
  show: boolean;

  arrCesta: any;
  numProductosCesta: Number;

  constructor(private peticionesService: PeticionesService, private router: Router) {
    
    this.show = false;
    this.arrCesta = [];

  }

  async ngOnInit() {

    const peticion = await this.peticionesService.getAllProducts();
    this.arrProducts = peticion;

    this.arrCesta = this.peticionesService.arrCesta;

    if (this.arrCesta.length > 0)
      this.contarProductosCesta();

  }

  irEscogerCantidad(){
    this.router.navigate(['/escoger/agricultor/producto/tipo']);
  }

  volverAgricultores(){
    this.router.navigate(['/escoger/agricultor']);
  }

  irHome() {
    this.router.navigate(['/home']);
  }

  /****************** CESTA ***********************/

  showCesta() {
    this.show = true;
  }

  hideCesta() {
    this.show = false;
    this.contarProductosCesta();
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

}
