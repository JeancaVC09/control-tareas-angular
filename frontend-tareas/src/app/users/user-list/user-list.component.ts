import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  usuarios: User[] = [];
  cargando = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.obtenerUsuarios().subscribe((data) => {
      this.usuarios = data;
      this.cargando = false;
    });
  }
}
