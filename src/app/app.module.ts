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
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {BadgeModule} from 'primeng/badge';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ParlamentarService } from './service/parlamentar.service';
import { TownHallService } from './service/townhall.service';
import { RoleService } from './service/role.service';
import { TimerControlComponent } from './timer-control/timer-control.component';
import { TownHallControlComponent } from './town-hall-control/town-hall-control.component';
import { AppRoutingModule } from './app-routing.module';
import { DialogModule } from 'primeng/dialog';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShowTimerComponent } from './show-timer/show-timer.component';
import { PopoutService } from './service/popout.service';
import { SoundService } from './service/sound.service';
import { UtilService } from './service/util.service';
import { AdminTownHallComponent } from './admin-town-hall/admin-town-hall.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminParlamentaresComponent } from './admin-parlamentares/admin-parlamentares.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MessageService } from 'primeng/api';
import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component';
import { LoginService } from './login.service';

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
    FormResetPasswordComponent
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
    TableModule,
    RippleModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    TabViewModule,
    RadioButtonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ParlamentarService, TownHallService, PopoutService, RoleService, SoundService, UtilService, MessageService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
