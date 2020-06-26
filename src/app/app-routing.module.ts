import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EscogerAgricultorComponent } from './escoger-agricultor/escoger-agricultor.component';
import { EscogerProductoComponent } from './escoger-producto/escoger-producto.component';
import { TipoProductoComponent } from './tipo-producto/tipo-producto.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';
import { LoginGuard } from './shared/guards/login.guard';
import { ConfirmacionOrdenComponent } from './confirmacion-orden/confirmacion-orden.component';
import { ProductosAgregadosComponent } from './productos-agregados/productos-agregados.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'login/user', component: UserComponent },
  { path: 'register', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'escoger/agricultor', component: EscogerAgricultorComponent, canActivate: [LoginGuard] },
  { path: 'escoger/agricultor/producto', component: EscogerProductoComponent, canActivate: [LoginGuard] },
  { path: 'escoger/agricultor/producto/tipo', component: TipoProductoComponent, canActivate: [LoginGuard] },
  { path: 'productos/agregados', component: ProductosAgregadosComponent, canActivate: [LoginGuard] },
  { path: 'orden/confirmacion', component: ConfirmacionOrdenComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
