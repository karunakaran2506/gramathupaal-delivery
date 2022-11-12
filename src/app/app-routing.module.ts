import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ActiveGuard } from './shared/guard/active.guard';
import { LoginGuard } from './shared/guard/login/login.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate : [LoginGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate : [ActiveGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'thanks',
    loadChildren: () => import('./thanks/thanks.module').then( m => m.ThanksPageModule)
  },
  {
    path: 'orderdetails',
    loadChildren: () => import('./orderdetails/orderdetails.module').then( m => m.OrderdetailsPageModule)
  },
  {
    path: 'delivery-reason',
    loadChildren: () => import('./delivery-reason/delivery-reason.module').then( m => m.DeliveryReasonPageModule)
  },
  {
    path: 'edit-location',
    loadChildren: () => import('./edit-location/edit-location.module').then( m => m.EditLocationPageModule)
  },
  {
    path: 'active-subscriptions',
    loadChildren: () => import('./active-subscriptions/active-subscriptions.module').then( m => m.ActiveSubscriptionsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash : true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
