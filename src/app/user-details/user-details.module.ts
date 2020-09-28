import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPersonalDetailsComponent } from './components/user-personal-details/user-personal-details.component';
import { UserBankDetailsComponent } from './components/user-bank-details/user-bank-details.component';
import { RouterModule, Routes } from '@angular/router';
import { UserEmploymentDetailsComponent } from './components/user-employment-details/user-employment-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  { path: '', redirectTo: 'car', pathMatch: 'full' },
  { path: 'personal', component: UserPersonalDetailsComponent },
  { path: 'bank', component: UserBankDetailsComponent },
  { path: 'employment', component: UserEmploymentDetailsComponent }
];

@NgModule({
  declarations: [
    UserPersonalDetailsComponent,
    UserBankDetailsComponent,
    UserEmploymentDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class UserDetailsModule { }
