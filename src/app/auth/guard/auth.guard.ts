import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
  } from '@angular/router';
  import { AuthService } from '../services/auth.service';
  import { Observable } from 'rxjs';
  import { map, take } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
  
  @Injectable({ providedIn: 'root' })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
  
    canActivate(
      route: ActivatedRouteSnapshot,
      router: RouterStateSnapshot
    ):
      boolean |
      UrlTree |
      Promise<boolean | UrlTree> |
      Observable<boolean | UrlTree> {
        const currentToken = this.authService.getToken();
        if (currentToken) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
    }
  }