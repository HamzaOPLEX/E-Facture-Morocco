import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtAuthService } from '@services/Auth/JWTAuthService/jwt-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private JWTauthService: JwtAuthService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is logged in
    if (this.JWTauthService.isAuthenticated()) {
      return true; // Continue with activation if user is logged in
    } else {
      return this.router.parseUrl('/login'); // Redirect to login if user is not logged in
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // This method will be called for child routes
    return this.canActivate(next, state); // Reuse the logic from canActivate
  }
}