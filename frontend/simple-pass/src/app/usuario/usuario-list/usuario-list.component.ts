import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service'
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  users: Array<Usuario> = []

  constructor(private router: Router,
              private service: UsuarioService,
              private notification : NzNotificationService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.service.listUsers().subscribe(users => this.users = users)
  }

  createNew() {
    this.router.navigate(['/user-form/0']);
  }

  update(id: string) {
    this.router.navigate(['/user-form/' + id]);
  }

  delete(id : string){
    this.service.deleteUser(id)
    .subscribe(response => {
      this.notification.success('Usuário', 'Usuário deletado com sucesso!')
      this.loadUsers();
    })
    
  }

}
