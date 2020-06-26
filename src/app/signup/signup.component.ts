import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeticionesService } from '../shared/services/peticiones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  register: FormGroup;

  confirmacion: boolean;

  constructor(private peticionesService: PeticionesService, private router: Router) {

    this.confirmacion = false;

    this.register = new FormGroup({
      formFirstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      formLastName: new FormControl('', [
        Validators.minLength(3)
      ]),
      formEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/)
      ]),
      formPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
      ]),
      formPhone: new FormControl(''),
      formAddress: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
  }

  async recogerDatos() {
    const member = this.register.value;
    const peticionMember = await this.peticionesService.createMember(member);
    const peticionUser = await this.peticionesService.createUser(member);
    this.register.reset();
    this.confirmacion = true;
    setTimeout(() => {
      this.router.navigate(['/login/user']);
    }, 3000);
  }

  cerrarRegisterForm() {
    this.router.navigate(['/login/user']);
  }

}
