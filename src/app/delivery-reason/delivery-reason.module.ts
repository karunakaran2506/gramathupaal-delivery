import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DeliveryReasonPageRoutingModule } from './delivery-reason-routing.module';
import { DeliveryReasonPage } from './delivery-reason.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DeliveryReasonPageRoutingModule,
    SharedModule,
  ],
  declarations: [DeliveryReasonPage],
})
export class DeliveryReasonPageModule {}
