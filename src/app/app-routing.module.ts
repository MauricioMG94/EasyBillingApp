import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BillListComponent } from './public/components/bill-list/bill-list.component';
import { HomeComponent } from './public/views/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'bill-list',
    component: BillListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
