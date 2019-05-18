import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from './usuario.model';
import { API } from '../app.api';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  listUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API}/users`)
  }

  getSingleUser(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${API}/users/${id}`)
  }

  createUser(user: Usuario): Observable<any> {
    return this.http.post<Usuario>(`${API}/users`, user)
  }

  updateUser(user: Usuario, id: string): Observable<Usuario> {
    return this.http.put<Usuario>(`${API}/users/${id}`, user)
  }

  deleteUser(id: string) {
    return this.http.delete(`${API}/users/${id}`)
  }
}
