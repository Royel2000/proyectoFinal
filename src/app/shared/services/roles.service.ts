import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private dbPath = '/usersCollections';
  public datos: any;
  rolesRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.rolesRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<any> {
    return this.rolesRef;
  }

  create(rol: any): any {
    return this.rolesRef.add(rol);
  }

  // Este método devuelve un Observable que emite los datos del grupo
  getDatosDelGrupo(key: string): Observable<any[]> {
    return this.db.collection('usersCollections', ref => ref.where('grupo', '==', key))
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.doc.data() as any;  // Utilizamos 'as any' para evitar errores de tipo
            const key = c.payload.doc.id;
            return { key, ...data };
          })
        )
      );
  }

  getRolUsuario(key: string): void {
    if (key) {
      this.rolesRef.snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({
              key: c.payload.doc.id,
              ...c.payload.doc.data()
            }))
          )
        )
        .subscribe(data => {
          let busqueda = 'user'; // Valor predeterminado
          data.forEach(value => {
            if (value.uid == key) {
              busqueda = value.rol || 'user';
            }
          });
          localStorage.setItem('rol', JSON.stringify(busqueda));
        });
    }
  }

  dataRolUsuario(key: string): void {
    if (key) {
      let busqueda2: any = '';
      this.rolesRef.snapshotChanges()
        .pipe(
          map(changes =>
            changes.map(c => ({
              key: c.payload.doc.id,
              ...c.payload.doc.data()
            }))
          )
        )
        .subscribe(data => {
          data.forEach(value => {
            if (value.uid == key) {
              busqueda2 = value || '';
            }
            localStorage.setItem('roldata', JSON.stringify(busqueda2));
          });
        });
    } else {
      localStorage.setItem('roldata', '');
    }
  }

  update(key: string, value: any): Promise<void> {
    return this.rolesRef.doc(key).update(value);
  }

  delete(key: string): Promise<void> {
    return this.rolesRef.doc(key).delete();
  }
}
