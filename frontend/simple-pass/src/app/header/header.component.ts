import { Router } from '@angular/router';
import { LoggedService } from "./../login/logged.service";
import { Component, OnInit } from "@angular/core";
import { Usuario } from 'app/usuario/usuario.model';
import { UsuarioService } from 'app/usuario/usuario.service';

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private loggedService: LoggedService,
              private router: Router,
              private userService : UsuarioService) {}

  user : Usuario
  userName : string

  ngOnInit() {
    this.user = this.loggedService.getCurrentUser();
  }

  logout() {
    this.loggedService.logout();
    this.router.navigate(['/login']);
  }
}
