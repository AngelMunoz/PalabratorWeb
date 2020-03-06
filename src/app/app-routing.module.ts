import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { WordPageComponent } from './words/word-page/word-page.component'
import { IsAuthorizedGuard } from './auth/is-authorized.guard';
import { ProfilePageComponent } from './profiles/profile-page/profile-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent, data: { name: 'login' } },
  { path: 'palabras', component: WordPageComponent, canActivate: [IsAuthorizedGuard], data: { name: 'palabras' } },
  { path: 'perfiles', component: ProfilePageComponent, canActivate: [IsAuthorizedGuard], data: { name: 'perfiles' } },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
