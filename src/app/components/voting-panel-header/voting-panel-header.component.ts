import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-voting-panel-header',
  templateUrl: './voting-panel-header.component.html',
  styleUrls: ['./voting-panel-header.component.scss']
})
export class VotingPanelHeaderComponent {
  constructor(){}

  @Input() sessionName: string;
}
