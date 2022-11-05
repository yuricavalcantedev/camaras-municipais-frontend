import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ParlamentarService } from './service/parlamentar.service';
import { TownHallService } from './service/townhall.service';
import { TimerControlComponent } from './timer-control/timer-control.component';
import { TownHallControlComponent } from './town-hall-control/town-hall-control.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShowTimerComponent } from './show-timer/show-timer.component';
import { PopoutService } from './service/popout.service';

@NgModule({
  declarations: [
    AppComponent,
    TimerControlComponent,
    TownHallControlComponent,
    HomeComponent,
    LoginComponent,
    ShowTimerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    CardModule,
    FormsModule,
    RippleModule,
    ButtonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ParlamentarService, TownHallService, PopoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
