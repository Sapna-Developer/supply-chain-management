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
export class UserRolesAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  /*
   * Checking user roles
   */

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const menus: any = localStorage.getItem('user-menu-role');
    const user = JSON.parse(menus);

    const permission = route.data.permission;

    let canActivate: boolean;

    if (!permission) {
      throw new Error('Permissions is not setup!');
    }
    if (!permission.only.length) {
      throw new Error('Roles are not setup!');
    }

    if (!user) {
      return false;
    }

    // canActivate = permission.only.includes(user.authorities);
    canActivate = user.some((el: any) => permission.only.includes(el));

    if (!canActivate) {
      // this.router.navigate([permission.redirectTo], { queryParams: { returnUrl: state.url } });
      this.router.navigate([permission.redirectTo]);
    }

    // if (user && user.userRole) {
    //   return true;
    // }

    // this.router.navigate(['no-access']);
    return canActivate;
  }
}
