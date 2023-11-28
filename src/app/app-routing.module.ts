import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PrincipalComponent } from './pages/principal/principal.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent},
  { path: 'registro', component: RegistroComponent, canActivate: [ AuthGuard] },
  { path: 'login'   , component: LoginComponent },
  { path: 'principal'   , component: PrincipalComponent },
  { path: 'admin'   , component: AdminComponent, canActivate: [ AuthGuard ] },
  { path: '**', redirectTo: 'principal' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
