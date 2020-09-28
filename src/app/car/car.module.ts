import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarResolverService } from './services/car-resolver.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarItemComponent } from './components/car-list/car-item/car-item.component';

const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: ':id', component: CarDetailsComponent, resolve: [CarResolverService] }
];

@NgModule({
  declarations: [
    CarListComponent,
    CarItemComponent,
    CarDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class CarModule { }
