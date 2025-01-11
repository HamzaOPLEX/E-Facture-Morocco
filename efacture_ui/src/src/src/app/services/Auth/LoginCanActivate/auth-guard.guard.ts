import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtAuthService } from '@services/Auth/JWTAuthService/jwt-auth-service.service';




@Injectable({
  providedIn: 'root'
})

// 
export class LoginAuthGuard implements CanActivate {
  constructor(
    private JWTauthService: JwtAuthService,
    private router: Router,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.JWTauthService.isAuthenticated()) {
      return this.router.parseUrl('/'); // redirect to home page if logged in
    } else {
      return true; // Redirect to if user is not logged in
    }
  }
  
}
