import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  private urlApi = environment.URL_API;
  arrCesta: any;

  countRef: number;

  constructor(private httpClient: HttpClient) {

    this.arrCesta = [];

    this.countRef = 20;

  }

  createMember(member) {
    const body = {
      name: member.formFirstName,
      surname: member.formLastName,
      address: member.formAddress,
      email: member.formEmail,
      phone: member.formPhone 
    };

    const httpOptions = {
      headers: new HttpHeaders({"Content-type": "application/json; charset=UTF-8"})
    };

    return this.httpClient.post(`${this.urlApi}member`, body, httpOptions).toPromise();
  }

  createUser(user) {
    const body = {
      user: user.formEmail,
      password: user.formPassword
    };

    const  httpOptions = {
      headers: new HttpHeaders({"Content-type": "application/json; charset=UTF-8"})
    };
    
    return this.httpClient.post(`${this.urlApi}user/register`, body, httpOptions).toPromise();
  }

  createOrder(order) {

    this.countRef += Math.random();

    const body = {
      reference : this.countRef,
      amount: order.amount,
      order_date: order.order_date,
      products: order.products
    };

    const httpOptions = {
      headers: new HttpHeaders({"Content-type": "application/json; charset=UTF-8"})
    };

    return this.httpClient.post(`${this.urlApi}order`, body, httpOptions).toPromise();

  }

  getAllProducts() {
    return this.httpClient.get(`${this.urlApi}product`).toPromise();
  }

  getAllSubproducts() {
    return this.httpClient.get(`${this.urlApi}subproduct`).toPromise();
  }

  recogerProductoLista(listaCompra) {
    return this.arrCesta = listaCompra;
  }

}
