import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Rol } from '../../models/rol.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private dbPath = '/usersCollections';

  rolesRef: AngularFirestoreCollection<Rol>;

  constructor(private db: AngularFirestore) {
    this.rolesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Rol> {
    return this.rolesRef;
  }

  create(rol: Rol): any {
    return this.rolesRef.add(rol);
  }
 
  getRolUsuario(key: string){
    if (key) {
     this.rolesRef.snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.payload.doc.id, ...c.payload.doc.data() })
            )
          )
        ).subscribe(data=> {
          var busqueda:string="";
          data.forEach(function (value) {
            if(value.uid==key){
              busqueda=value.roles?value.roles:'user';
            }   
          }); 
          localStorage.setItem('rol',busqueda);
        });
    } 
  }
  dataRolUsuario(key: string){
    if (key) {
     this.rolesRef.snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.payload.doc.id, ...c.payload.doc.data() })
            )
          )
        ).subscribe(data=> {
          var busqueda2:any="";
          data.forEach(function (value) {
            if(value.uid==key){
              busqueda2=value?value:"";
            }   
          });
          localStorage.setItem('roldata',JSON.stringify(busqueda2));
        });
    } 
  }
  update(key: string, value: any): Promise<void> {
    return this.rolesRef.doc(key).update(value);
  }

  delete(key: string): Promise<void> {
    return this.rolesRef.doc(key).delete();
  }

 
}