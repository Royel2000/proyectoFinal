import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SalonComponent } from './components/salon/salon.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { RolGuard } from './shared/guard/rol.guard';
import { HomeComponent } from './components/home/home.component';
import { CargaComponent } from './components/carga/carga.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'registrar2', component: TutorialsListComponent },
  { path: 'registrar', component: SignUpComponent, canActivate: [RolGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'salon', component: SalonComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'carga', component: CargaComponent },
  { path: 'upload', component: UploadFormComponent, canActivate: [AuthGuard] },
  { path: 'uploadlist', component: UploadListComponent, canActivate: [AuthGuard] },
  { path: 'uploadDetails', component: UploadDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
