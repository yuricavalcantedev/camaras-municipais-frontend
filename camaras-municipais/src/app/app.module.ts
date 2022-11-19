import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {MessageModule} from 'primeng/message';

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
import { SoundService } from './service/sound.service';
import { UtilService } from './service/util.service';

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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    CardModule,
    MessageModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    TableModule,
    RippleModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ParlamentarService, TownHallService, PopoutService, SoundService, UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
