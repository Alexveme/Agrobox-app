import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeticionesService } from '../shared/services/peticiones.service';

@Component({
  selector: 'app-escoger-agricultor',
  templateUrl: './escoger-agricultor.component.html',
  styleUrls: ['./escoger-agricultor.component.css']
})
export class EscogerAgricultorComponent implements OnInit {

  show: boolean;

  arrCesta: any;
  numProductosCesta: Number;

  constructor(private peticionesService: PeticionesService, private router: Router) {

    this.show = false;
    this.arrCesta = [];

  }

  ngOnInit(): void {

    this.arrCesta = this.peticionesService.arrCesta;

    if (this.arrCesta.length > 0)
      this.contarProductosCesta();

  }

  irProductos() {
    this.router.navigate(['/escoger/agricultor/producto']);
  }

  volverHome() {
    this.router.navigate(['/home']);
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
