import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './public/views/home/home.component';
import { BillTemplateComponent } from './public/components/bill-template/bill-template.component';
import { AppHeaderComponent } from './public/components/app-header/app-header.component';
import { ReactiveFormsModule} from '@angular/forms';
import { AppFooterComponent } from './public/components/app-footer/app-footer.component';
import { BillListComponent } from './public/components/bill-list/bill-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    BillTemplateComponent,
    AppHeaderComponent,
    AppFooterComponent,
    BillListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
