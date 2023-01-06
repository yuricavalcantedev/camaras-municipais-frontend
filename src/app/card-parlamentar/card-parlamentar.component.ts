import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ParlamentarPresence } from '../domain/parlamentar-presence.model';
import { Session } from '../domain/session.model';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-card-parlamentar',
  templateUrl: './card-parlamentar.component.html',
  styleUrls: ['./card-parlamentar.component.scss']
})
export class CardParlamentar implements OnInit {

  @Input() politicalParty: string;
  @Input() name: string;
  @Input() photo: string;
  constructor() { }
  ngOnInit(): void {}

}
