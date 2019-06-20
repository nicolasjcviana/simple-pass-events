import { ENDPOINTS } from "./../app.api";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Usuario } from "app/usuario/usuario.model";

@Injectable({
  providedIn: "root"
})
export class LoggedService {
  private isLoggedIdentifier: string = "IS_LOGGED";

  constructor(private http: HttpClient) {}

  isLogged(): boolean {
    return localStorage.getItem(this.isLoggedIdentifier) ? true : false;
  }

  getCurrentUser(): Usuario {
    return JSON.parse(localStorage.getItem(this.isLoggedIdentifier));
  }

  login(user: string, password: string) {
    const body = { cpf: user, pass: password };
    return this.http.post(`${ENDPOINTS.USER}/login`, body).pipe(
      tap((response: any) => {
        if (response.Count > 0) {
          localStorage.setItem(this.isLoggedIdentifier, JSON.stringify( response.Items[0]));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.isLoggedIdentifier);
  }
}
