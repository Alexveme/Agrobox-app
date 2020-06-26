import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'agroboxApp';
  arrProductos: any[];

  constructor() {
    this.arrProductos = [];
  }

  enviarCesta(event) {
    const producto = {...event};
    this.arrProductos.push(producto);
    console.log(this.arrProductos);
  }
}
