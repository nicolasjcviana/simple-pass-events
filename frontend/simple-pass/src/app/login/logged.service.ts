import { ENDPOINTS } from "./../app.api";
import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoggedService {
  private isLoggedIdentifier: string = "IS_LOGGED";

  constructor(private http: HttpClient) {}

  isLogged(): boolean {
    return localStorage.getItem(this.isLoggedIdentifier) ? true : false;
  }

  login(user: string, password: string) {
    const body = { cpf: user, pass: password };
    return this.http.post(`${ENDPOINTS.USER}/login`, body).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem(this.isLoggedIdentifier, user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.isLoggedIdentifier);
  }
}
