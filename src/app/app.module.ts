import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {MessageModule} from 'primeng/message';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {BadgeModule} from 'primeng/badge';
import { CookieService } from 'ngx-cookie-service';
import {ProgressBarModule} from 'primeng/progressbar';
import {BlockUIModule} from 'primeng/blockui';
import { DialogModule } from 'primeng/dialog';
import {PanelModule} from 'primeng/panel';
import {TooltipModule} from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ChipModule } from 'primeng/chip';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShowTimerComponent } from './show-timer/show-timer.component';
import { TimerControlComponent } from './timer-control/timer-control.component';
import { TownHallControlComponent } from './town-hall-control/town-hall-control.component';
import { AdminTownHallComponent } from './admin-town-hall/admin-town-hall.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminParlamentaresComponent } from './admin-parlamentares/admin-parlamentares.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component';
import { UserHomeComponent } from './user-home/user-home.component';

import { ParlamentarService } from './service/parlamentar.service';
import { TownHallService } from './service/townhall.service';
import { RoleService } from './service/role.service';
import { LoginService } from './service/login.service';
import { SoundService } from './service/sound.service';
import { UtilService } from './service/util.service';

import { AppRoutingModule } from './app-routing.module';
import { VotingPanelComponent } from './voting-panel/voting-panel.component';
import { HeaderComponent } from './header/header.component';
import { CardParlamentar } from './card-parlamentar/card-parlamentar.component';
import { DatePipe } from '@angular/common';
import { ClockComponent } from "./clock/clock.component";

@NgModule({
  declarations: [
    AppComponent,
    TimerControlComponent,
    TownHallControlComponent,
    HomeComponent,
    LoginComponent,
    ShowTimerComponent,
    AdminTownHallComponent,
    AdminUsersComponent,
    AdminParlamentaresComponent,
    AdminHomeComponent,
    FormResetPasswordComponent,
    UserHomeComponent,
    VotingPanelComponent,
    HeaderComponent,
    CardParlamentar,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    CardModule,
    MessageModule,
    BadgeModule,
    DynamicDialogModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    FormsModule,
    ChipModule,
    TableModule,
    RippleModule,
    ButtonModule,
    PanelModule,
    CheckboxModule,
    DialogModule,
    TabViewModule,
    TooltipModule,
    BlockUIModule,
    ProgressBarModule,
    RadioButtonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ParlamentarService, TownHallService, RoleService, SoundService, UtilService, MessageService, LoginService, CookieService, DatePipe, { provide: LOCALE_ID, useValue: "pt-BR" },],
  bootstrap: [AppComponent]
})
export class AppModule { }
