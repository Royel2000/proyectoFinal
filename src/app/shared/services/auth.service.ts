import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { RolesService } from './roles.service';
import { Rol } from './roles';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  rolesData: any;
  rr: any;
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public rolesuser: RolesService,

  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.Rolesquery(user.uid);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        JSON.parse(localStorage.getItem('roldata')!);
      } else {
        localStorage.setItem('user', 'null');
        localStorage.setItem('roldata', 'null');
        JSON.parse(localStorage.getItem('user')!);
        JSON.parse(localStorage.getItem('roldata')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);

        this.rolesuser.dataRolUsuario(result.user!.uid);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            // console.log(user.uid);
            //console.log(this.rolesuser.getRol(user.uid));
            this.Rolesquery(user.uid);
            //this.SetRolesData(this.rolesuser.getRol(user.uid) );
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  Rolesquery(key: string) {
    this.rolesuser.getAll().snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        var busqueda: any;
        data.forEach(function (value) {
          if (value.uid == key) {
            busqueda = value;
          }
        });
        this.SetRolesData(busqueda);

      });
  }
  // Sign up with email/password
  SignUp(
    email: string,
    password: string,
    rol: string,
    imagen: string,
    nombre: string,
    apellido: string,
    aprobado: string,
    grupo: string,
    carrera: string
  ) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.afs.collection('usersCollections').add({
          uid: result.user?.uid,
          rol: rol,
          imagen: imagen,
          nombre: nombre,
          apellido: apellido,
          aprobado: aprobado,
          grupo: grupo,
          carrera: carrera,
        });
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        // this.SetRolesData(this.rolesuser.getRol(result.user!.uid) );
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }
  SetRolesData(roles: any) {

    const rolesRef: AngularFirestoreDocument<any> = this.afs.doc(
      `userCollections/${roles.uid}`
    );

    const rolesData: Rol = {
      uid: roles.key,
      nombre: roles.nombre,
      aprobado: roles.aprobado,
      imagen: roles.imagen,
      grupo: roles.grupo,
      rol: roles.rol,
      apellido: roles.apellido,
      carrera: roles.carrera,
    };

    return rolesRef.set(rolesData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('roldata');
      this.router.navigate(['sign-in']);
    });
  }
}