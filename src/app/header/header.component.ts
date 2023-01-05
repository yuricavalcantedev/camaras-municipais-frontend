import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ParlamentarPresence } from '../domain/parlamentar-presence.model';
import { Session } from '../domain/session.model';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {}

}
