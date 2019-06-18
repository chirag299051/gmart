import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/observable/of'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
     this.user$ = this.afAuth.authState; 
    }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.auth.signOut()
    // .then(() => {
    //   window.location.assign('https://accounts.google.com/Logout')};
  }

  get appUser$() {
    return this.user$
    .switchMap(user => {
      console.log(user)
      if(user) return this.userService.get(user.uid);
      return Observable.of(null);
    })
  }
}
