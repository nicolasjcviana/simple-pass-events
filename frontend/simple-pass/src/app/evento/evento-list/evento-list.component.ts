import { Component, OnInit } from '@angular/core';
import { Evento } from '../evento.model';
import { Router } from '@angular/router';
import { EventoService } from '../evento.service';
import 'rxjs/add/operator/catch'

@Component({
  selector: 'evento-list',
  templateUrl: './evento-list.component.html',
  styleUrls: ['./evento-list.component.css']
})
export class EventoListComponent implements OnInit {

  events: Array<Evento> = []

  constructor(private router: Router, private service: EventoService) {
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.service.listAllEvents()
    .subscribe(events => this.events = events)
  }

  createNew() {
    this.router.navigate(['/evento-form/id=0']);
  }

  updateEvent(id: string) {
    this.router.navigate(['/evento-form/id=' + id]);
  }

}
