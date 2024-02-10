import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-voting-button',
  templateUrl: './voting-button.component.html',
  styleUrls: ['./voting-button.component.css'],
})
export class VotingButtonComponent {
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() size: string;
  @Input() icon: string;
  @Input() color: string = 'white';
  @Input() horizontal: boolean = false;
  @Input() rounded: boolean = false;
  @Input() state: string = '';
}
