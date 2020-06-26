import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { PeticionesService } from '../shared/services/peticiones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  show: boolean;

  arrCesta: any;
  numProductosCesta: Number;

  constructor(private peticionesService: PeticionesService, private authService: AuthService, private router: Router) {

    this.show = false;
    this.arrCesta = [];

  }

  ngOnInit(): void {

    this.arrCesta = this.peticionesService.arrCesta;

    if (this.arrCesta.length > 0)
      this.contarProductosCesta();

  }

  logOut() {
    this.authService.logoutUser();
    this.router.navigate(['/login/user']);
  }

  irComprarVerduras() {
    this.router.navigate(['/escoger/agricultor']);
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
