import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from './usuario.model';
import { ENDPOINTS } from '../app.api';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  listUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${ENDPOINTS.USER}`)
  }

  getSingleUser(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${ENDPOINTS.USER}/${id}`)
  }

  createUser(user: Usuario): Observable<any> {
    return this.http.post<Usuario>(`${ENDPOINTS.USER}`, user)
  }

  updateUser(user: Usuario, id: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${ENDPOINTS.USER}/${id}`, user)
  }

  deleteUser(id: string) {
    return this.http.delete(`${ENDPOINTS.USER}/${id}`)
  }
}
