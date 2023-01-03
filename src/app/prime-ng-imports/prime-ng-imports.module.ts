import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {MessageModule} from 'primeng/message';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {BadgeModule} from 'primeng/badge';
import {ProgressBarModule} from 'primeng/progressbar';
import {BlockUIModule} from 'primeng/blockui';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [],
  imports: [
    DropdownModule,
    DialogModule,
    CardModule,
    MessageModule,
    BadgeModule,
    DynamicDialogModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    TableModule,
    RippleModule,
    ButtonModule,
    CheckboxModule,
    TabViewModule,
    BlockUIModule,
    ProgressBarModule,
    RadioButtonModule,
  ],
  providers:[MessageService]
})
export class PrimeNgImportsModule { }
