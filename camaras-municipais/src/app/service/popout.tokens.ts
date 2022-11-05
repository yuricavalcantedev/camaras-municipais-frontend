import { InjectionToken } from '@angular/core';
import { Parlamentar } from '../domain/parlamentar.model';

export interface PopoutData {
  modalName: string;
  name:string,
  parlamentar: Parlamentar,
  timer: number
}

export const POPOUT_MODAL_DATA = new InjectionToken<PopoutData>('POPOUT_MODAL_DATA');

export enum PopoutModalName {
  'customerDetail' = 'CUSTOMER_DETAIL'
}

export let POPOUT_MODALS : any= {
};

