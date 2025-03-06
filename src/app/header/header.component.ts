import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UtilService } from '../service/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() townHallName: string;
  @Input() townHallUrlImage: string;

  isOnline: boolean = navigator.onLine;

  constructor(private utilService: UtilService) {
    window.addEventListener('online', () => this.updateOnlineStatus(true));
    window.addEventListener('offline', () => this.updateOnlineStatus(false));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    window.removeEventListener('online', () => this.updateOnlineStatus(true));
    window.removeEventListener('offline', () => this.updateOnlineStatus(false));
  }

  private updateOnlineStatus(status: boolean): void {
    this.isOnline = status;
  }

  fullScreen() {
    this.utilService.fullScreen();
  }
}

