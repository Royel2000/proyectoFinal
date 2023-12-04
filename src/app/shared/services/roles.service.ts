import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Rol } from '../services/roles';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private dbPath = '/usersCollections';
  public datos:any;
  rolesRef: AngularFirestoreCollection<Rol>;
  datarol!:  AngularFirestoreCollection<Rol>;
  constructor(private db: AngularFirestore) {
    this.rolesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Rol> {
    return this.rolesRef;
  }

  create(rol: Rol): any {
    return this.rolesRef.add(rol);
  }
  getRol(key: string){
      this.rolesRef;
  }
  getRol2(key: string){
    this.datos = this.db.collection('usersCollections', ref => ref.where('grupo','==', key )).valueChanges()
    return this.datos;
  }
  getRolUsuario(key: string) {
    if (key) {
      this.rolesRef
        .snapshotChanges()
        .pipe(
          map((changes) =>
            changes.map((c) => ({
              key: c.payload.doc.id,
              ...c.payload.doc.data(),
            }))
          )
        )
        .subscribe((data) => {
          var busqueda: string = '';
          data.forEach(function (value) {
            if (value.uid == key) {
              busqueda = value.rol ? value.rol : 'user';
            }
          });
          localStorage.setItem('rol', JSON.stringify(busqueda));
        });
    }
  }
  dataRolUsuario(key: string) {
    if (key) {
      var busqueda2: any = '';
      this.rolesRef
        .snapshotChanges()
        .pipe(
          map((changes) =>
            changes.map((c) => ({
              key: c.payload.doc.id,
              ...c.payload.doc.data(),
            }))
          )
        )
        .subscribe((data) => {
          data.forEach(function (value) {
            if (value.uid == key) {
              busqueda2 = value ? value : '';
            }
           // console.log(busqueda2);
            localStorage.setItem('roldata', JSON.stringify(busqueda2));
          });
        });
      
      //console.log('roldata', localStorage.getItem('roldata'));
    }else{
      localStorage.setItem('roldata',"");
    }
  }
  update(key: string, value: any): Promise<void> {
    return this.rolesRef.doc(key).update(value);
  }

  delete(key: string): Promise<void> {
    return this.rolesRef.doc(key).delete();
  }
}