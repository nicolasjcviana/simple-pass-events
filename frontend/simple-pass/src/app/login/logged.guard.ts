import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { LoggedService } from "./logged.service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class LoggedGuard implements CanActivate {
  constructor(private loggedService: LoggedService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.loggedService.isLogged() ? true : this.router.navigate(['/login']) && false;
  }
}
