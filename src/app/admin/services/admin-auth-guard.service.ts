import { Injectable } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { CanActivate } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/SwitchMap';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$
    .map(appUser => appUser.isAdmin);
  }
}
