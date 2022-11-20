import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminParlamentaresComponent } from './admin-parlamentares/admin-parlamentares.component';
import { AdminTownHallComponent } from './admin-town-hall/admin-town-hall.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShowTimerComponent } from './show-timer/show-timer.component';
import { TimerControlComponent } from './timer-control/timer-control.component';

const routes : Routes = [
  {path: '', component: HomeComponent},
  {path: 'admin', component: AdminHomeComponent},
  {path: 'admin/camaras', component: AdminTownHallComponent},
  {path: 'admin/usuarios', component: AdminUsersComponent},
  {path: 'admin/parlamentares', component: AdminParlamentaresComponent},
  {path: 'login', component: LoginComponent},
  {path: 'controleTempo', component: TimerControlComponent},
  {path: 'mostrarTempo', component: ShowTimerComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
