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

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventos : Evento[]
  user : Usuario
  userID = 'e5431890-8e23-11e9-b41c-61a89de5cfd5';

  constructor(private eventoService: EventoService,
    private notification: NzNotificationService, 
    private userService : UsuarioService) {
  }
  
  ngOnInit() {
    this.initCards();
  }

  initCards() : void{
    this.eventoService.listAllEvents()
    .subscribe(eventos =>  {
      this.eventos = eventos
      console.log(this.eventos)
    })
    this.userService.getSingleUser(this.userID)
    .subscribe(user => {
      this.user = user
    console.log(user)});
  }
  
  go(evento : Evento){
    evento.guests = this.updateList(evento.guests, this.userID);
    this.user.events = this.updateList(this.user.events, evento.id);

    Observable.forkJoin([this.eventoService.updateEvent(evento, evento.id),
                        this.userService.updateUser(this.user, this.user.id)])
    .subscribe(res => {
      this.notification.success('Evento', 'Confirmada sua ida ao evento \"' + evento.title+"\"")
    })
  }

  updateList(array : string[], id : string){
    if(!array){
      array = []
    }
    if (array.indexOf(id) === -1){
      array.push(id);
    }
    return array
  }

}
