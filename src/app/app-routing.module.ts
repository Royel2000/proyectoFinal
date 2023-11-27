import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './pages/login/login.component';
import { AlumnoComponent } from './components/alumno/alumno.component';


const routes: Routes = [
  { path: 'alumno', component: AlumnoComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
