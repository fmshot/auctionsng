import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserlandingComponent } from './userlanding/userlanding.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { NewproductsdetailsComponent} from './newproductsdetails/newproductsdetails.component';
import { ChatComponent} from './chat/chat.component';
import { AdminproductstableComponent } from './adminproductstable/adminproductstable.component';
import { AdminuserstableComponent } from './adminuserstable/adminuserstable.component';
import { AdminauctionstableComponent } from './adminauctionstable/adminauctionstable.component';
import { FaqComponent } from './faq/faq.component';
import { AdminproductdetailsComponent } from './adminproductdetails/adminproductdetails.component';





const routes: Routes = [
  { path: 'admindetails/:id', component: AdminproductdetailsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'adminproductdetails/:id', component: NewproductsdetailsComponent },
  { path: 'userlanding', component: UserlandingComponent },
  { path: '', redirectTo: '/userlanding', pathMatch: 'full'},
  { path: 'userdashboard', component: UserdashboardComponent },
  { path: 'appchat/:id', component: ChatComponent},
  { path: 'appchat', component: ChatComponent},
  { path: 'products-admin', component: AdminproductstableComponent},
  { path: 'users-admin', component: AdminuserstableComponent },
  { path: 'auctions-admin', component: AdminauctionstableComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
