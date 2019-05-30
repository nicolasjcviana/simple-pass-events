import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENDPOINTS } from './../app.api';
import { Observable } from "rxjs";
import { Evento } from "./evento.model";

@Injectable()
export class EventoService {

    constructor(private http: HttpClient) {
    }

    listAllEvents(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${ENDPOINTS.EVENT}`);
    }

    eventById(id: string): Observable<Evento> {
        return this.http.get<Evento>(`${ENDPOINTS.EVENT}${id}`)
    }

    createEvent(event: Evento): Observable<any> {
        return this.http.post(`${ENDPOINTS.EVENT}`, event)
    }

    updateEvent(event: Evento, id: string): Observable<Evento> {
        return this.http.put<Evento>(`${ENDPOINTS.EVENT}'/'${id}`, event)
    }

    deleteEvent(id: string) {
        return this.http.delete(`${ENDPOINTS.EVENT}/${id}`)
    }


}