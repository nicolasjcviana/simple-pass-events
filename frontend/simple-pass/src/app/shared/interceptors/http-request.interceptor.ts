import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpsRequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req.headers.set("Access-Control-Allow-Origin", "*");
    req.headers.set("Access-Control-Allow-Headers", "Origin, X-Request-Width, Content-Type, Accept");
    // const dupReq = req.clone({
    //   headers: req.headers.set('access-control-allow-origin', '*')
    // });
    return next.handle(req);
  }
}
