import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserlandingComponent } from './userlanding/userlanding.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { NewproductsdetailsComponent} from './newproductsdetails/newproductsdetails.component';
import { ChatComponent} from './chat/chat.component';
import { AdminproductstableComponent } from './adminproductstable/adminproductstable.component';
import { AdminuserstableComponent } from './adminuserstable/adminuserstable.component';
import { AdminauctionstableComponent } from './adminauctionstable/adminauctionstable.component';




const routes: Routes = [
  { path: 'adminproductdetails/:id', component: NewproductsdetailsComponent},
  { path: 'userlanding', component: UserlandingComponent },
  { path: '', redirectTo: '/userlanding', pathMatch: 'full'},
  { path: 'userdashboard', component: UserdashboardComponent },
  { path: 'appchat/:id', component: ChatComponent},
  { path: 'appchat', component: ChatComponent},
  { path: 'adminproductstable', component: AdminproductstableComponent},
  { path: 'adminuserstable', component: AdminuserstableComponent },
  { path: 'adminauctionstable', component: AdminauctionstableComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
