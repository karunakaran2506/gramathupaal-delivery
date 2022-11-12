import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActiveSubscriptionsPageRoutingModule } from './active-subscriptions-routing.module';
import { ActiveSubscriptionsPage } from './active-subscriptions.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActiveSubscriptionsPageRoutingModule,
    SharedModule
  ],
  declarations: [ActiveSubscriptionsPage]
})
export class ActiveSubscriptionsPageModule {}
