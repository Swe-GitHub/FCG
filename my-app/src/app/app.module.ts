import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormWrapperComponent } from './form-wrapper/form-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    FormWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    DynamicFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
