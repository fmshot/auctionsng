import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AppRoutingModule} from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
// Import ng-circle-progress
// import { NgCircleProgressModule } from 'ng-circle-progress';

  // src/app/app.module.ts
  import { ChatService } from './services/chat.service';
  import { PusherService } from './services/pusher.service';
  // import { HttpClientModule } from '@angular/common/http';
  // import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {AppComponent} from './app.component';
import {Routes} from '@angular/router';
// import { HomepageComponent } from './homepage/homepage.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import {FirstpageComponent} from './firstpage/firstpage.component';
// import { EcommercepageComponent } from './ecommercepage/ecommercepage.component';
// import { NewproductsdetailsComponent } from './newproductsdetails/newproductsdetails.component';
// import {LoginpageComponent} from './loginpage/loginpage.component';
// import { AdminsidebarComponent} from "./adminsidebar/adminsidebar.component";
// import { AdminheadingbarComponent } from "./adminheadingbar/adminheadingbar.component";
// import {CompanypageComponent} from './companypage/companypage.component';
// import {APP_ROUTES} from './app-routing.module';

// import { AdminproductstableComponent } from './adminproductstable/adminproductstable.component';
// import { AdminuserstableComponent } from './adminuserstable/adminuserstable.component';
// import {AdminbasicpageComponent} from './adminbasicpage/adminbasicpage.component';
// import {AdminsidebarComponent} from './adminsidebar/adminsidebar.component';
// import {NavbarandfooterComponent} from './navbarandfooter/navbarandfooter.component';
// import {RegisterpageComponent} from './registerpage/registerpage.component';
// import {AdminproductstableComponent} from './adminproductstable/adminproductstable.component';
import { UserlandingComponent } from './userlanding/userlanding.component';
// import { UserloginComponent } from './userlogin/userlogin.component';
// import { AboutshopcartComponent } from './aboutshopcart/aboutshopcart.component';
// import { ContactusComponent } from './contactus/contactus.component';
// import { ShopcartwatchesComponent } from './shopcartwatches/shopcartwatches.component';
import {CurrentonlineuserService} from './shared/currentonlineuser.service';
import {RegistrationService} from './shared/registration.service';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { NewproductsdetailsComponent } from './newproductsdetails/newproductsdetails.component';
import { ChatComponent } from './chat/chat.component';
import { AdminproductstableComponent } from './adminproductstable/adminproductstable.component';
import { AdminuserstableComponent } from './adminuserstable/adminuserstable.component';
import { AdminauctionstableComponent } from './adminauctionstable/adminauctionstable.component';
import { AdminbidstableComponent } from './adminbidstable/adminbidstable.component';
import { FaqComponent } from './faq/faq.component';
// import { UserdashboardComponent } from './userdashboard/userdashboard.component';
// import { ProductdetailsComponent } from './productdetails/productdetails.component';
// import { UserproductdetailsComponent } from './userproductdetails/userproductdetails.component';
// import { MyDetailsComponent } from './my-details/my-details.component';
// import { ChatComponent } from './chat/chat.component';
// import { LandingchatComponent } from './landingchat/landingchat.component';
// import { AdmineditproductsComponent } from './admineditproducts/admineditproducts.component';
// import { UsersuccessfulauctionsComponent } from './usersuccessfulauctions/usersuccessfulauctions.component';
// import { AdmineditusersComponent } from './admineditusers/admineditusers.component';
// import { UsereditformComponent } from './usereditform/usereditform.component';
// import { AdminadduserComponent } from './adminadduser/adminadduser.component';
// import { AdminbidstableComponent } from './adminbidstable/adminbidstable.component';
// import { AdminaddbidComponent } from './adminaddbid/adminaddbid.component';
// import { AdminauctionstableComponent } from './adminauctionstable/adminauctionstable.component';
// import { AdminaddauctionComponent } from './adminaddauction/adminaddauction.component';
// import { UpcomingComponent } from './upcoming/upcoming.component';
// import { UserheaderComponent } from './userheader/userheader.component';
// import { UserfooterComponent } from './userfooter/userfooter.component';
// import { AdmineditauctionsComponent } from './admineditauctions/admineditauctions.component';
// import { UsershomepageComponent } from './usershomepage/usershomepage.component';
// import { NewuserproductdetailsComponent } from './newuserproductdetails/newuserproductdetails.component';
// import { NewestuserproductdetailsComponent } from './newestuserproductdetails/newestuserproductdetails.component';

// import { CompanylandingpageComponent } from './companylandingpage/companylandingpage.component';


@NgModule({
  declarations: [
    AppComponent,


    // HomepageComponent,
    // DashboardComponent,
    // FirstpageComponent,
    // EcommercepageComponent,
    // NewproductsdetailsComponent,
    // LoginpageComponent,
    // AdminpageComponent,
    // AdminproductstableComponent,
    // AdminuserstableComponent,
    // AdminbasicpageComponent,
    // AdminsidebarComponent,
    // NavbarandfooterComponent,
    // routingComponents,
    // CompanylandingpageComponent,
    // RegisterpageComponent,
    // CompanypageComponent,
    UserlandingComponent,


    UserdashboardComponent,


    NewproductsdetailsComponent,


    ChatComponent,


    AdminproductstableComponent,


    AdminuserstableComponent,


    AdminauctionstableComponent,


    AdminbidstableComponent,


    FaqComponent,
    // UserloginComponent,
    // AboutshopcartComponent,
    // ContactusComponent,
    // ShopcartwatchesComponent,
    // UserdashboardComponent,
    // ProductdetailsComponent,
    // UserproductdetailsComponent,
    // MyDetailsComponent,
    // ChatComponent,
    // LandingchatComponent,
    // AdmineditproductsComponent,
    // UsersuccessfulauctionsComponent,
    // AdmineditusersComponent,
    // UsereditformComponent,
    // AdminadduserComponent,
    // AdminbidstableComponent,
    // AdminaddbidComponent,
    // AdminauctionstableComponent,
    // AdminaddauctionComponent,
    // UpcomingComponent,
    // UserheaderComponent,
    // UserfooterComponent,
    // AdmineditauctionsComponent,
    // UsershomepageComponent,
    // NewuserproductdetailsComponent,
    // NewestuserproductdetailsComponent,
    ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBcyujTPzCwRXuietjauYhPXoHe6oEGbbQ',
    authDomain: 'auctionsreal.firebaseapp.com',
    databaseURL: 'https://auctionsreal.firebaseio.com',
    projectId: 'auctionsreal',
    storageBucket: 'auctionsreal.appspot.com',
    messagingSenderId: '101618432328'
  }),
    AngularFireDatabaseModule, // this imports only the firebasedatabse
    AngularFireStorageModule,
    // Specify ng-circle-progress as an import
    // NgCircleProgressModule.forRoot({
    //   // set defaults here
    //   radius: 100,
    //   outerStrokeWidth: 16,
    //   innerStrokeWidth: 8,
    //   outerStrokeColor: '#78C000',
    //   innerStrokeColor: '#C7E596',
    //   animationDuration: 300,
    // }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollToModule.forRoot(),
    // RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [RegistrationService,
    CurrentonlineuserService,
    ChatService,
    PusherService],

  bootstrap: [AppComponent]
})
export class AppModule {
}

  // providers:[ChatService, PusherService]
