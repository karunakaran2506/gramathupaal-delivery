import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryReasonPage } from './delivery-reason.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryReasonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryReasonPageRoutingModule {}
