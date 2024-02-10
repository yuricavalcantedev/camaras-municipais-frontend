import { Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() disabled: boolean;
  @Input() label: string;
  @Input() fontLabelSize: string;
  @Input() iconSize: string;
  @Input() icon: string;
  @Input() color: string = 'white';
  @Input() colorButton: string = 'white';
  @Input() horizontal: boolean = false;
  @Input() rounded: boolean = false;
}
