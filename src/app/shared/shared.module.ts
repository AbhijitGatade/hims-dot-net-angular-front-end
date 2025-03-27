import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { Router, RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS, CustomDateAdapter } from './custom-date-adapter';

@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],  
  exports:[
    FormsModule, ReactiveFormsModule, MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Ensures DD/MM/YYYY format
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ]
})
export class SharedModule { }
