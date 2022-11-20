import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor() { }

  ngOnInit(): void {

    this.items = [
      {label: 'Câmaras', icon: 'pi pi-fw pi-building', routerLink: ['/admin/camaras']},
      {label: 'Utilizadores', icon: 'pi pi-fw pi-users', routerLink: ['/admin/usuarios']},
      {label: 'Parlamentares', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/parlamentares']},
    ];

    this.activeItem = this.items[0];
  }

}
