import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MIN_LENGTH_VALIDATOR, MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
import { NzProgressModule } from 'ng-zorro-antd';
import { CameraService } from 'app/camera/camera.service';
import { NzCardModule } from 'ng-zorro-antd';
import { EventoService } from 'app/evento/evento.service';
import { Evento } from 'app/evento/evento.model';

import { NzNotificationService } from 'ng-zorro-antd';
import { UsuarioService } from 'app/usuario/usuario.service';
import { Observable } from 'rxjs';
import { Usuario } from 'app/usuario/usuario.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { LoggedService } from 'app/login/logged.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventos: Evento[]
  user: Usuario

  constructor(private eventoService: EventoService,
    private notification: NzNotificationService,
    private userService: UsuarioService,
    private loggedService: LoggedService) {
  }

  ngOnInit() {
    this.user = this.loggedService.getCurrentUser();
    this.initCards();
  }

  initCards(): void {
    this.userService.getSingleUser(this.user.id)
      .subscribe(user => {
        this.user = user
        this.eventoService.listAllEvents()
          .subscribe(eventos => {
            this.eventos = eventos
            eventos.forEach(eve => console.log(eve))
          })
      });
  }

  go(evento: Evento) {
    evento.guests = this.updateList(evento.guests, this.user.id);
    this.user.events = this.updateList(this.user.events, evento.id);

    Observable.forkJoin([this.eventoService.updateEvent(evento, evento.id),
    this.userService.updateUser(this.user, this.user.id)])
      .subscribe(res => {
        this.notification.success('Evento', 'Confirmada sua ida ao evento \"' + evento.title + "\"")
      })
  }

  letGo(evento: Evento) {
    evento.guests = this.removeItemFromList(evento.guests, this.user.id);
    this.user.events = this.removeItemFromList(this.user.events, evento.id);

    Observable.forkJoin([this.eventoService.updateEvent(evento, evento.id),
    this.userService.updateUser(this.user, this.user.id)])
      .subscribe(res => {
        this.notification.success('Evento', 'Você não ira mais ao evento \"' + evento.title + "\"")
      })
  }

  removeItemFromList(array: string[], id: string) {
    const index = array.indexOf(id, 0);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  updateList(array: string[], id: string) {
    if (!array) {
      array = []
    }
    if (array.indexOf(id) === -1) {
      array.push(id);
    }
    return array
  }

  contains(eventoId: string) {
    if(!this.user.events){
      this.user.events = []
    }
    return this.user.events.indexOf(eventoId) !== -1
  }

}
