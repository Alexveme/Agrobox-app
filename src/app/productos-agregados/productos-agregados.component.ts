import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-agregados',
  templateUrl: './productos-agregados.component.html',
  styleUrls: ['./productos-agregados.component.css']
})
export class ProductosAgregadosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.router.navigate(['/escoger/agricultor/producto']);
    }, 3000);

  }

}
