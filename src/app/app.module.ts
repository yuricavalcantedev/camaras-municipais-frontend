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
import { ShowTimerComponent } from './components/show-timer/show-timer.component';
import { TimerControlComponent } from './components/timer-control/timer-control.component';
import { TownHallControlComponent } from './components/town-hall-control/town-hall-control.component';
import { AdminTownHallComponent } from './components/admin-town-hall/admin-town-hall.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminParlamentaresComponent } from './components/admin-parlamentares/admin-parlamentares.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { FormResetPasswordComponent } from './form-reset-password/form-reset-password.component';
import { UserHomeComponent } from './components/user-home/user-home.component';

import { ParlamentarService } from './service/parlamentar.service';
import { TownHallService } from './service/townhall.service';
import { RoleService } from './service/role.service';
import { LoginService } from './service/login.service';
import { SoundService } from './service/sound.service';
import { UtilService } from './service/util.service';

import { AppRoutingModule } from './app-routing.module';
import { VotingPanelComponent } from './components/voting-panel/voting-panel.component';
import { HeaderComponent } from './header/header.component';
import { CardParlamentar } from './card-parlamentar/card-parlamentar.component';
import { DatePipe } from '@angular/common';
import { ClockComponent } from "./clock/clock.component";
import { TownhallSettingsComponent } from './components/townhall-settings/townhall-settings.component';
import { VotingPanelHeaderComponent } from './components/voting-panel-header/voting-panel-header.component';
import { HomeButtonComponent } from './home-button/home-button.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { VotingButtonComponent } from './components/user-home/voting-button/voting-button.component';
import { ButtonComponent } from './components/button/button.component';
import { CardMenuComponent } from './card-menu/card-menu.component';
import { CardVotingComponent } from './card-voting/card-voting.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectButtonComponent } from './components/select-button/select-button.component';
import { VotingPanelLeftComponent } from './components/voting-panel-flexible/voting-panel-left/voting-panel-left.component';
import { VotingPanelRightComponent } from './components/voting-panel-flexible/voting-panel-right/voting-panel-right.component';
import { VotingFooterComponent } from './components/voting-panel-flexible/components/voting-footer/voting-footer.component';
import { FormUpdateParlamenterInfoComponent } from './components/form-update-parlamenter-info/form-update-parlamenter-info.component';
import { SpeakerListComponent } from './components/speaker-list/speaker-list.component';

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
    ClockComponent,
    TownhallSettingsComponent,
    VotingPanelHeaderComponent,
    HomeButtonComponent,
    VotingButtonComponent,
    ButtonComponent,
    CardMenuComponent,
    CardVotingComponent,
    SelectButtonComponent,
    VotingPanelLeftComponent,
    VotingPanelRightComponent,
    VotingFooterComponent,
    FormUpdateParlamenterInfoComponent,
    SpeakerListComponent
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
    ProgressSpinnerModule,
    RadioButtonModule,
    HttpClientModule,
    AppRoutingModule,
    SelectButtonModule,
  ],
  providers: [ParlamentarService, TownHallService, RoleService, SoundService, UtilService, MessageService, LoginService, CookieService, DatePipe, { provide: LOCALE_ID, useValue: "pt-BR" },],
  bootstrap: [AppComponent]
})
export class AppModule { }
