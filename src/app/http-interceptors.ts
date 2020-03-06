import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from './auth/auth-service.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private readonly auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();
    if (authToken) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      var authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });
    }


    // send cloned request with header to the next handler.
    // authReq is hoisted (var) if it's defined (it means the auth token exists)
    // else just handle the request normally
    return next.handle(authReq || req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
]
