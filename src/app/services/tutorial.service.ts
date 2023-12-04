import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Rol  } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private dbPath = '/usersCollections';

  tutorialsRef: AngularFireList<Rol>;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Rol> {
    return this.tutorialsRef;
  }

  create(tutorial: Rol): any {
    return this.tutorialsRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.tutorialsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.tutorialsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.tutorialsRef.remove();
  }
}