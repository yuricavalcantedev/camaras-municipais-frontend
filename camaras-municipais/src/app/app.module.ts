import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DropdownModule} from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ParlamentarService } from './service/parlamentar.service';
import { TownHallService } from './service/townhall.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DropdownModule,
    HttpClientModule
  ],
  providers: [ParlamentarService, TownHallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
