import { ComponentPortal, DomPortalOutlet, PortalInjector } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, OnDestroy } from '@angular/core';
import { ShowTimerComponent } from '../show-timer/show-timer.component';
import { VotingPanelComponent } from '../voting-panel/voting-panel.component';
import {POPOUT_MODAL_DATA, POPOUT_MODALS} from './popout.tokens';

@Injectable()
export class PopoutService implements OnDestroy {
  styleSheetElement: HTMLLinkElement;

  constructor(private injector: Injector,  private componentFactoryResolver: ComponentFactoryResolver, private applicationRef: ApplicationRef) {

  }

  ngOnDestroy() {}

  openPopoutModal() {

    let data: { name: ''}
    const windowInstance = this.openOnce(
      'assets/modal/popout.html',
      'MODAL_POPOUT'
    );

    // Wait for window instance to be created
    setTimeout(() => {
      this.createCDKPortal(data, windowInstance, 'Tempo de Fala');
    }, 1000);
  }

  openOnce(url: any, target: any) {
    // Open a blank "target" window
    // or get the reference to the existing "target" window
    const winRef = window.open('', target, '');
    // If the "target" window was just opened, change its url
    if(winRef !== null && winRef !== undefined){
        if (winRef.location.href === 'about:blank') {
            winRef.location.href = url;
          }
    }
    return winRef;
  }

  createCDKPortal(data: any, windowInstance: any, windownName: string) {
    if (windowInstance) {
      // Create a PortalOutlet with the body of the new window document
      const outlet = new DomPortalOutlet(windowInstance.document.body, this.componentFactoryResolver, this.applicationRef, this.injector);
      // Copy styles from parent window
      document.querySelectorAll('style').forEach(htmlElement => {
        windowInstance.document.head.appendChild(htmlElement.cloneNode(true));
      });
      // Copy stylesheet link from parent window
      this.styleSheetElement = this.getStyleSheetElement();
      windowInstance.document.head.appendChild(this.styleSheetElement);

      this.styleSheetElement.onload = () => {
        // Clear popout modal content
        windowInstance.document.body.innerText = '';

        // Create an injector with modal data
        const injector = this.createInjector(data);

        // Attach the portal
        let componentInstance;
        windowInstance.document.title = 'Tempo de Fala';
        componentInstance = windownName == 'Painel Eletronico' ? this.attachVotingPanelContainer(outlet, injector) : this.attachCustomerContainer(outlet, injector);
        

        POPOUT_MODALS['windowInstance'] = windowInstance;
        POPOUT_MODALS['outlet'] = outlet;
        POPOUT_MODALS['componentInstance'] = componentInstance;
      };
    }
  }

  isPopoutWindowOpen() {
    return POPOUT_MODALS['windowInstance'] && !POPOUT_MODALS['windowInstance'].closed;
  }

  focusPopoutWindow() {
    POPOUT_MODALS['windowInstance'].focus();
  }

  closePopoutModal() {
    Object.keys(POPOUT_MODALS).forEach(modalName => {
      if (POPOUT_MODALS['windowInstance']) {
        POPOUT_MODALS['windowInstance'].close();
      }
    });
  }

  attachCustomerContainer(outlet: DomPortalOutlet, injector: Injector | PortalInjector | null | undefined) {
    const containerPortal = new ComponentPortal(ShowTimerComponent, null, injector);
    const containerRef: ComponentRef<ShowTimerComponent> = outlet.attach(containerPortal);
    return containerRef.instance;
  }

  attachVotingPanelContainer(outlet: DomPortalOutlet, injector: Injector | PortalInjector | null | undefined) {
    const containerPortal = new ComponentPortal(VotingPanelComponent, null, injector);
    const containerRef: ComponentRef<VotingPanelComponent> = outlet.attach(containerPortal);
    return containerRef.instance;
  }

  createInjector(data: {name: string}): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(POPOUT_MODAL_DATA, data);
    return new PortalInjector(this.injector, injectionTokens);
  }

  getStyleSheetElement() {
    const styleSheetElement = document.createElement('link');
    document.querySelectorAll('link').forEach(htmlElement => {
      if (htmlElement.rel === 'stylesheet') {
        const absoluteUrl = new URL(htmlElement.href).href;
        styleSheetElement.rel = 'stylesheet';
        styleSheetElement.href = absoluteUrl;
      }
    });
    return styleSheetElement;
  }
}
