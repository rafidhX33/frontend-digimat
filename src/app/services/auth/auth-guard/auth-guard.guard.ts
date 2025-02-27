import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
class OutAuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var token = this.authService.getToken();
    if (token != null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

class OnAuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var token = this.authService.getToken();
    if (token == null) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

export { OutAuthGuard, OnAuthGuard };
