import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderService } from '@ServiciosLogica';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoaderComponent } from '../../../../libs/web/loader/loader.component';

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    LoaderService,
    { provide: APP_BASE_HREF, useValue: '/restaurante/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: 'es-Co' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
