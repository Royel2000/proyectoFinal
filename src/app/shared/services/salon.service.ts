import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Rol } from '../services/roles';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalonService {
  private dbPath = '/usersCollections';
  rolesRef: AngularFirestoreCollection<Rol>;

  constructor(private db: AngularFirestore) {
    this.rolesRef = db.collection(this.dbPath);
  }

  getAllRoles(): AngularFirestoreCollection<Rol> {
    return this.rolesRef;
  }

  getRolesByGroup(key: string) {
    return this.db.collection('usersCollections', ref => ref.where('grupo', '==', key)).valueChanges();
  }

  // Otros métodos que puedas necesitar para manipular roles en el contexto de un salón


}
