import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion-orden',
  templateUrl: './confirmacion-orden.component.html',
  styleUrls: ['./confirmacion-orden.component.css']
})
export class ConfirmacionOrdenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }

}
