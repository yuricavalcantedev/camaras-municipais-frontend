import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShowTimerComponent } from './components/show-timer/show-timer.component';
import { TimerControlComponent } from './components/timer-control/timer-control.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { VotingPanelComponent } from './components/voting-panel/voting-panel.component';
import { TownhallSettingsComponent } from './components/townhall-settings/townhall-settings.component';
import { VotingPanelLeftComponent } from './components/voting-panel-flexible/voting-panel-left/voting-panel-left.component';
import { VotingPanelRightComponent } from './components/voting-panel-flexible/voting-panel-right/voting-panel-right.component';
import { SpeakerListComponent } from './components/speaker-list/speaker-list.component';

const routes : Routes = [
  {path: '', component: LoginComponent},
  {path: 'gestao', component: HomeComponent},
  {path: 'painel-votacao', component: VotingPanelComponent},
  {path: 'painel-votacao/esquerdo', component: VotingPanelLeftComponent},
  {path: 'painel-votacao/direito', component: VotingPanelRightComponent},
  {path: 'home', component: UserHomeComponent},
  {path: 'lista-oradores', component: SpeakerListComponent},
  {path: 'admin', component: AdminHomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'controleTempo', component: TimerControlComponent},
  {path: 'mostrarTempo', component: ShowTimerComponent},
  {path: 'townhallSettings/:id', component: TownhallSettingsComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
