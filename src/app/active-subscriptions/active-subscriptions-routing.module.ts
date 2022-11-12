import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActiveSubscriptionsPage } from './active-subscriptions.page';

const routes: Routes = [
  {
    path: '',
    component: ActiveSubscriptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActiveSubscriptionsPageRoutingModule {}
