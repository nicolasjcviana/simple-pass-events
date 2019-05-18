import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service'
import { Router } from '@angular/router';

@Component({
  selector: 'usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  users: Array<Usuario> = []

  constructor(private router: Router,
              private service: UsuarioService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.service.listUsers().subscribe(users => this.users = users)
  }

  createNew() {
    this.router.navigate(['/user-form/id=0']);
  }

  updateUser(id: string) {
    this.router.navigate(['/user-form/id=' + id]);
  }

}
