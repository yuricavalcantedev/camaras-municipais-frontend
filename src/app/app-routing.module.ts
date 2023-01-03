import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShowTimerComponent } from './show-timer/show-timer.component';
import { TimerControlComponent } from './timer-control/timer-control.component';
import { UserHomeComponent } from './user-home/user-home.component';

const routes : Routes = [
  {path: '', component: LoginComponent},
  {path: 'gestao', component: HomeComponent},
  {path: 'home', component: UserHomeComponent},
  {path: 'admin', component: AdminHomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'controleTempo', component: TimerControlComponent},
  {path: 'mostrarTempo', component: ShowTimerComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
