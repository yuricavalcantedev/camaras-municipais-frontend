// src/app/components/select-button/select-button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-select-button',
  templateUrl: './select-button.html',
  styleUrls: ['./select-button.css']
})
export class SelectButtonComponent {
  @Input() options: SelectOption[] = [];
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onSelect(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}