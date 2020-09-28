import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard'
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./user-details/user-details.module').then(m => m.UserDetailsModule), canActivate: [AuthGuard] },
  { path: 'car', loadChildren: () => import('./car/car.module').then(m => m.CarModule), canActivate: [AuthGuard] },
  { path: 'quote', loadChildren: () => import('./quote/quote.module').then(m => m.QuoteModule), canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
