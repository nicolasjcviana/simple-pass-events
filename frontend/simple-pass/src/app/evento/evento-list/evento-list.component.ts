import { Component, OnInit } from '@angular/core';
import { Evento } from '../evento.model';
import { Router } from '@angular/router';

@Component({
  selector: 'evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css']
})
export class EventoListComponent implements OnInit {

  events: Array<Evento> = []

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    let evento = new Evento('UUID', 'Feijoada OBS', 'Feijoada do obs', 'Feijuca', 35, 'Blumenau');
    this.events.push(evento);
  }

  createNew() {
    this.router.navigate(['/evento-form/id=0']);
  }


}
