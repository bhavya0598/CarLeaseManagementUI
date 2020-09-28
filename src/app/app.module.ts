import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './auth/interceptor/index';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [httpInterceptorProviders,DatePipe, CurrencyPipe],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector: Injector){

  }
  ngDoBootstrap(){
    const appComp = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('app-root', appComp);
  }
}


