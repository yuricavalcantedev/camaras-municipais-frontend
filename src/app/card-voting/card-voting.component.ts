import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-voting',
  templateUrl: './card-voting.html',
  styleUrls: ['./card-voting.scss']
})
export class CardVotingComponent {
  @Input() title: string;
  @Input() iconType: 'yes' | 'no' | 'abs';
}