import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_EVENT } from './../app.api';
import { Observable } from "rxjs";
import { Evento } from "./evento.model";

@Injectable()
export class EventoService {


    constructor(private http: HttpClient) {
    }

    listAllEvents(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${API_EVENT}`);
    }

    eventById(id: string): Observable<Evento> {
        return this.http.get<Evento>(`${API_EVENT}${id}`)
    }

    createEvent(event: Evento): Observable<any> {
        return this.http.post(`${API_EVENT}`, event)
    }

    updateEvent(event: Evento, id: string): Observable<Evento> {
        return this.http.put<Evento>(`${API_EVENT}'/'${id}`, event)
    }

    deleteEvent(id: string) {
        return this.http.delete(`${API_EVENT}/${id}`)
    }


}