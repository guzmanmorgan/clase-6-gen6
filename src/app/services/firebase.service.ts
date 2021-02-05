import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private angularFireAuth: AngularFireAuth
  ) { }

  async login(email: string, pass: string) {
    try {
      const respAuth = await this.angularFireAuth.auth.signInWithEmailAndPassword(email, pass);
      console.log('respuesta Auth-->', respAuth);
      localStorage.setItem(
        'email', respAuth.user.email
      )
      return respAuth;
    } catch (error) {
      console.error('error auth -->', error);
    }
  }

  async logout() {
    try {
      const logoutResp = await this.angularFireAuth.auth.signOut();
      console.log('logout exitoso');
      localStorage.clear();
      return logoutResp;
    } catch (error) {
      console.error('logout error -->', error);
      return error;
    }
  }

  async currentUSer() {
    try {
      const currentUSerResp = this.angularFireAuth.auth.currentUser;
      return currentUSerResp;
    } catch (error) {
      console.log('error current user -->', error);
    }
  }

}
