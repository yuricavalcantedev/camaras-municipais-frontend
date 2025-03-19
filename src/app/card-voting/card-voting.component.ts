import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-voting',
  templateUrl: './card-voting.html',
  styleUrls: ['./card-voting.scss']
})
export class CardVotingComponent {
  @Input() title: string;
  @Input() iconType: 'yes' | 'no' | 'abs';
  @Input() isSelected: boolean = false;

  getBackgroundColor(): string {
    if (!this.isSelected) return 'rgba(0, 95, 132, 0.6)';
    
    switch (this.iconType) {
      case 'yes':
        return 'rgba(0, 128, 0, 0.6)'; 
      case 'no':
        return 'rgba(255, 0, 0, 0.6)'; 
      case 'abs':
        return '#FFCD27';
      default:
        return 'rgba(0, 95, 132, 0.6)';
    }
  }
}