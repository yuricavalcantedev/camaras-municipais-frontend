import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.html',
  styleUrls: ['./card-menu.scss']
})
export class CardMenuComponent {
  @Input() title: string;
  @Input() iconType: 'inscricao' | 'lista' | 'pauta' | 'sair' | 'mais-opcoes' | 'desinscricao' | 'tempo';
}