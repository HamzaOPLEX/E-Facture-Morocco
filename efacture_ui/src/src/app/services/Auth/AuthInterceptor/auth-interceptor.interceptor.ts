import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtAuthService } from '@services/Auth/JWTAuthService/jwt-auth-service.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private JWTauthService: JwtAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.JWTauthService.getToken()

    // Exclude login requests from token addition
    if (request.url.endsWith('/login') && request.method === 'POST') {
      return next.handle(request);
    }

    // If the access token is available, add the Authorization header
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(request);
  }
}
