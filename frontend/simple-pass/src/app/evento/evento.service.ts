import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from './../app.api';
import { Observable } from "rxjs";
import { Evento } from "./evento.model";

@Injectable()
export class EventoService {


    constructor(private http: HttpClient) {
    }

    listAllEvents(): Observable<Evento[]> {
        return null;
    }

    eventById(id: string): Observable<Evento> {
        return this.http.get<Evento>(`${API}/event/${id}`)
    }
}