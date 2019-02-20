import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import { Router } from '@angular/router';
// import {ViewChild, ElementRef} from '@angular/core';


import {AdminproductService} from '../shared/adminproduct.service';
import {Adminproduct} from '../shared/adminproduct.model';
import {RegistrationService} from '../shared/registration.service';
import {Registration} from '../shared/registration.model';
import {CurrentonlineuserService} from '../shared/currentonlineuser.service';
import {Currentonlineuser} from '../shared/currentonlineuser.model';
import {AuctionService} from '../shared/auction.service';

@Component({
  selector: 'app-userlanding',
  templateUrl: './userlanding.component.html',
  styleUrls: ['./userlanding.component.css'],
  providers: [RegistrationService, CurrentonlineuserService, AdminproductService, AuctionService]

})
export class UserlandingComponent implements OnInit {
  // @ViewChild('closeBtn') closeBtn: ElementRef;
  public removeShowAuctionButton3 = 'please login to view auctions!';
  public removeShowAuctionButton2: boolean = false;
  public removeShowAuctionButton: boolean = false;
  public loggedInUser: any;
  public wrongInput: string = '';
  public cannotView: boolean = false;
  public allUsers: any = [];
  public currentUsers: any = [];
  public allAuctions: any = [];
  public thisDate = {};
  public onGoingAuctions: any[] = [];
  public showAuctions: boolean = false;
  public auctionOnProductId = {};
  public datebutton: boolean;
  public allProducts: any = [];
  public userAccessForm: FormGroup;
  public registrationForm: FormGroup;
  public current_date = new Date().getTime();
  // public current_time = getTime();
  public yyy;
  public load = {
    requesting: false,
  };
  static userAccessForm = () => {
    return {
      email: ['', Validators.required],
      password: ['', Validators.required],
      // phonenumber: ["", Validators.required],
    };
  }

  static registrationForm = () => {
    return {
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
      phonenumber: ['']
    }
  }
  constructor(private activeRoute: ActivatedRoute,
    private currentonlineuserService: CurrentonlineuserService,
              private registrationService: RegistrationService,
              private adminproductService: AdminproductService,
              private auctionService: AuctionService,
              private fb: FormBuilder,
              private router: Router)
  {
    activeRoute.params.subscribe(param => {
      this.loggedInUser = localStorage.getItem('current_user');
      console.log('r', this.loggedInUser)});
    this.registrationForm = this.fb.group(UserlandingComponent.registrationForm());
    this.userAccessForm = this.fb.group(UserlandingComponent.userAccessForm());

  }
  ngOnInit() {
  this.removeShowAuctionButton2 = false;
    if (this.loggedInUser) {
      this.removeShowAuctionButton = true;
      // this.removeShowAuctionButton2 = true;
    }
    // console.log('grhjk,m nb');
    this.getProducts();
    // this.getauctions();
    this.getAuctions();
    this.wrongInput = 'Please login to view more!';
  }
   // for users' login submit
  onSubmitUserAccess() {
    this.load.requesting = true;
    this.currentonlineuserService.postCurrentonlineuser(this.userAccessForm.value).subscribe(
      (res) => {
        // this.load.requesting = false;
        // this.currentUsers.push(res);
        // this.userAccessForm.reset();
        // this.router.navigate(['/productdetails',{}]);
       localStorage.setItem('current_user', JSON.stringify(res));
       document.getElementById('close_modal').click();
        this.router.navigateByUrl('/userdashboard');
        
        // this.resetForm(form);
        // this.getProducts();
      },
      (error) => {

        this.load.requesting = false;
        console.log('nooo userr' );
      },
      () => {
      });
  }
 // for users' login submit
// for submitting new user
onSubmitRegistrationForm() {
  this.load.requesting = true;
  this.registrationService.postRegistration(this.registrationForm.value).subscribe(
    (res) => {
      this.load.requesting = false;
      localStorage.setItem('currentRegistered_User', JSON.stringify(res));
      // this.router.navigateByUrl('/userdashboard');
      this.allUsers.push(res);
      console.log('wwww', this.allUsers);
      this.registrationForm.reset();

      // this.resetForm(form);
      // this.getProducts();

    },
    (error) => {
      this.load.requesting = false;

    },
    () => {

    });
}
// for submitting new user



alertNonUser() {
  this.cannotView = true;
    // alert('Please Login First!');
}
private getProducts() {
  this.adminproductService.getAdminProduct().subscribe(
    (response: any) => {
      console.log('respone gfhgfhfghhg ', response);
      this.allProducts = response;
    }, (error) => {
      console.log('Error ', error);
    });
}
// for complete table on init
// public getauctions() {
//   this.auctionService.getAuction().subscribe(
//     (response: any) => {
//       console.log('respone gfhgfhfghhg ', response);
//       this.allAuctions = response;
//       if(response.auctiondate > this.current_date){
//           console.log('wertyu');
//       }
//       this.allAuctions.forEach(auction => {
//         auction['date_time'] = new Date(auction.auctiondate + ' ' + auction.auctiontime).getTime()
//       });
//     }, (error) => {
//       console.log('Error ', error);
//     });
// }
// for complete table on init

private getAuctions() {
  this.auctionService.getAuction().subscribe(
    (response: any) => {
      console.log('All ongoing auctions', response);
      this.auctionOnProductId = response.auctionProductId;
      this.onGoingAuctions = response.filter(auction => {
        // if(auction.productObject[0]=='{'){
          auction.productObject = JSON.parse(auction.productObject);
        // }
        return (auction.startAuction);
      });
      console.log('All ongoing auctions', this.onGoingAuctions);
      // this.allProductss = response;
    }, (error) => {
      console.log('Error ', error);
    });
}
 // call this wherever you want to close modal
//  private closeModal(): void {
//   this.closeBtn.nativeElement.click();
// }

}
// res.data.forEach(auction => {
//   auction['date_time'] = new Date(auction.auctiondate + ' ' + auction.auctiontime).getTime()
//   });

//   *ngIf="current_date < data?.date_time"
