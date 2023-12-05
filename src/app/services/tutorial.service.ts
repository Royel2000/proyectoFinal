import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Rol } from '../shared/services/roles';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private dbPath = '/usersCollections';

  tutorialsRef: AngularFirestoreCollection<Rol>;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Rol> {
    return this.tutorialsRef;
  }

  create(tutorial: Rol): any {
    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    console.log(id);
    return this.tutorialsRef.doc(id).delete();
  }
}
