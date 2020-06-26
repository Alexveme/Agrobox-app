import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component'
import { EscogerAgricultorComponent } from './escoger-agricultor/escoger-agricultor.component';
import { EscogerProductoComponent } from './escoger-producto/escoger-producto.component';
import { TipoProductoComponent } from './tipo-producto/tipo-producto.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { CestaComponent } from './cesta/cesta.component';
import { ConfirmacionOrdenComponent } from './confirmacion-orden/confirmacion-orden.component';
import { ProductosAgregadosComponent } from './productos-agregados/productos-agregados.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EscogerAgricultorComponent,
    EscogerProductoComponent,
    TipoProductoComponent,
    UserComponent,
    SignupComponent,
    CestaComponent,
    ConfirmacionOrdenComponent,
    ProductosAgregadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
