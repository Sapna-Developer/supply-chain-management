import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  /*
   * Checking if token is not expired
   */

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // return true

    if (this.authService.isAuthenticated()) {
      return true;
    }

    // this.router.navigate(['/authentication/login'], {
    //   queryParams: { returnUrl: state.url }
    // });

    window.location.href = `${environment.url}`;
    return false;
  }
}
