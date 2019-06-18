import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CustomFormsModule,
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    HomeComponent,
    LoginComponent
  ]
})
export class CoreModule { }
