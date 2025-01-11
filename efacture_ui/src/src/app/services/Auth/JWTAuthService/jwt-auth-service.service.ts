import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {
  private readonly TOKEN_KEY = 'token';

  constructor(public jwtHelper: JwtHelperService) { }

  getToken(){
    const token = localStorage.getItem('token');
    return token
  }

  getUser(){
    const token = localStorage.getItem('token');
    let username = this.jwtHelper.decodeToken(token).username
    let userID = this.jwtHelper.decodeToken(token).user_id
    return {
            username:username,
            userID:userID
          }
  }



  public isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('[+] JwtAuthService : token =>',token)
    var isLoggedIn = false;
    var isExpired = true
    // Check whether the token is expired and return
    // true or false
    if (token != null) {
      isExpired = this.jwtHelper.isTokenExpired(token)
      if (isExpired == false) {
        isLoggedIn = true
        console.log('[+] JwtAuthService : token valid')
      }
      else {
        isLoggedIn = false
        console.log('[+] JwtAuthService : token expired')
      }
    }
    else {
      isLoggedIn = false; // if not token find so it's expired
      console.log("[+] JwtAuthService : null" + isExpired)
    }
    console.log("[+] JwtAuthService : Is User Logged In", isLoggedIn)
    return isLoggedIn;
  }

  // Function to set the token in localStorage
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Function to remove the token from localStorage
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

}