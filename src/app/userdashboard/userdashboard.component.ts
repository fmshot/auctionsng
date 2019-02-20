import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

import { AuctionService } from '../shared/auction.service';
import { BidService } from '../shared/bid.service';
import {AdminproductService} from '../shared/adminproduct.service';
import {Adminproduct} from '../shared/adminproduct.model';
import { ChatService } from '../services/chat.service';
import { AuctionuserService } from '../shared/auctionuser.service';
import { ReturnStatement } from '@angular/compiler';
// import { EMAIL_VALIDATOR } from '@angular/forms';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css'],
  providers: [AdminproductService, AuctionuserService]
})
export class UserdashboardComponent implements OnInit {
  public showMeAuctions: boolean = false;
  public pro: any;
  public usersAuctionMine: any;
  public parsedonGoingAuctions: any;
  public onGoings: any;
  public newproductObjects: any;
  public ttta: any;
  public ttt: any;
  public startauctone: any;
  public getAuctionid: any;
  public myAuctions: any;
  public usersauctionid: any;
  public Usersauction: any;
  public parsedUser;
  private onlyMyAuctions: any = null;
  public userAuctionId: any;
  private auctionId: string;
  private viewedAuction: any = {};
  private viewedAuctions: any[] = [];
  private allViewedAuctions = [];
  public currentUser ={};
  public currentRegisteredUser ={};
  public loggedInUser:any;
  public allProducts: any = [];
  public clearcurrentUser = {};
  public onGoingAuctions:any[]=[];
  public onGoingAuctionss:any[]=[];
  public firstFourAuctions:any[] = [];
  public paidAuctions:any[]=[];
  public showAuctions:boolean=false;
  public auctionOnProductId={};
  private viewedProduct: any = null;
  private productId: string;

  constructor(private activeRoute: ActivatedRoute,
    private auctionuserService: AuctionuserService,
    private adminprodService: AdminproductService,
    private router:Router,
    private adminproductService: AdminproductService,
    private auctionService: AuctionService,
    private _bidService:BidService,    
    private _chatService:ChatService) 
    {
      activeRoute.params.subscribe(param => {
        this.auctionId = param.id;
        // this.getAuctionById();
        // this.auctionId = param.id;
        // this.getAuctionById();
        this.loggedInUser =localStorage.getItem('current_user');
        this.parsedUser = JSON.parse(this.loggedInUser);
      })
      
    }
// this.loggedInUser =localStorage.getItem('current_user');
//     if(!this.loggedInUser){this.onLogout()};


//   }

  ngOnInit() {
    if(localStorage.getItem('forauctions')) {
      this.showAuctions = true;
    }
    this.currentRegisteredUser = JSON.parse(localStorage.getItem('currentRegistered_User'));
    this.currentUser = JSON.parse(localStorage.getItem('current_user'));
    this.getAuctions();
    this.getAuctionById();
    this.getAuctionusers();
    // this.getAllMyAuctions();
    this.getProducts();
    // this.getpaidAuctions();
    console.log('Current User', this.currentUser);
    // console.log('Current User', this.currentUser.firstname);
    console.log('CurrentRegisteredUser', this.currentRegisteredUser);

  }



 //for users' logout button
 onLogout() {
  // this.load.requesting = true;
  // this.currentonlineuserService.postCurrentonlineuser(this.userAccessForm.value).subscribe(
    // (res) => {
      // this.load.requesting = false;
      // this.currentUsers.push(res);
      // this.userAccessForm.reset();
      // this.router.navigate(['/productdetails',{}]);
// localStorage.setItem('current_user',JSON.stringify(res));
localStorage.setItem('current_user', null); 
// this.router.navigateByUrl('');
console.log('Current User', 
// localStorage.getItem('current_user')
);
this.router.navigateByUrl('');


      // this.resetForm(form);
      // this.getProducts();
    }

    // private getProducts() {
    //   this.adminproductService.getAdminProduct().subscribe(
    //     (response: any) => {
    //       console.log('respone gfhgfhfghhg ', response);
    //       this.allProducts = response;
    //     }, (error) => {
    //       console.log('Error ', error);
    //     });
    // }
    public getAllMyAuctions() {
      // let userAuctionId ;
      const user = JSON.parse(this.loggedInUser);
      this.getAuctionusers();
    }

    public getAuctionusers() {
      const user = JSON.parse(this.loggedInUser);
      const firstFourAuctions = [];
let count = 0;
let arrayLimit = Math.random() * 10;
arrayLimit = Math.floor(arrayLimit);
      this.auctionuserService.getAuctionuser().subscribe(
        (response: any) => {
          // this.Usersauction = response;
          console.log('autuser',  response);
          response.forEach( (userauction) => {
            // if (response['useremail'] === user['email']) {
            // if (auction.productObject[0] == '{') {
            //   auction.productObject = JSON.parse(auction.productObject);
            // }
            userauction.auctionproduct =  JSON.parse(userauction.auctionproduct);
            console.log('s', response);
            // response.auctionproduct.productobject =  JSON.parse(userauction.auctionproduct.productobject);
            return;
          });
          response.forEach( (userauction) => {
            userauction.auctionproduct.productObject =  JSON.parse(userauction.auctionproduct.productObject);
            console.log('ps', response);
            if (count < arrayLimit) {
              firstFourAuctions.push(userauction.auctionproduct);
            }
            count++;
           });
           
this.firstFourAuctions = firstFourAuctions;
          console.log('firstFourAuctions', this.firstFourAuctions);
          console.log('first', response);
          console.log('second', response);
          // let email;
          // let auct;
          // console.table(response);
          // this.Usersauction = response.map(res => {
          //   email = res.useremail;
          //   auct = res.auctionid;
          // });

          // console.log('autuser1', email);
          // console.log('autuser1', auct);
          console.log('autuser2', user['email']);
          // if (response['useremail'] == user['email']) {
          //   console.log('Matched!');
          // }
        }, (error) => {});
    }
    public getAuctionById() {
      this.auctionService.getAuctionById(this.usersauctionid).subscribe(
        (response: any) => {
          // response['startAuction']
  
          this.getProductsById(response.auctionProductId);
          console.log('respone for my auction by id ', response);
          this.viewedAuction = response;
          this.viewedAuction['productObject'] = JSON.parse(this.viewedAuction['productObject']);
          console.log('respone viewed auction ', this.viewedAuction);
          // this.viewedAuction['']
        },
        (error) => {
          console.log('Error ', error);
        });
    }

    // public getAuctionById() {
    //   this.auctionService.getAuctionById(this.usersauctionid).subscribe(
    //     (response: any) => {
    //       this.myAuctions = response.filter(auctions => {
    //         if (auctions.productObject[0] === '{') {
    //           auctions.productObject = JSON.parse(auctions.productObject);
    //         }
    //         console.log('w', this.myAuctions);
    //         // return (auction.startAuction);
    //       });
  
          // this.getProductsById(response.auctionProductId);
          // console.log('respone', response);
          // this.viewedAuction = response;
          // this.viewedAuction['productObject'] = JSON.parse(this.viewedAuction['productObject']);
          // // console.log('respone viewed auction ', this.viewedAuction);
    //     },
    //     (error) => {
    //       console.log('Error ', error);
    //     });
    // }

    public getProductsById(id) {
      this.adminprodService.getAdminProductById(id).subscribe(
        (response: any) => {
  
          console.log('respone gfhgfhfghhg ', response);
          this.viewedProduct = response;
        },
        (error) => {
          console.log('Error ', error);
        });
    }

     private getProducts(){
      this.adminproductService.getAdminProduct().subscribe(
        (response: any) => {
          console.log('response 4 userdashboard', response);
          this.allProducts = response;
        }, (error) => {
          console.log('There is an Error Here', error);
        });
     }

     
     private getAuctions() {
      this.auctionService.getAuction().subscribe(
        (response: any) => {
          this.auctionOnProductId = response.auctionProductId;
          console.log('All ongoing auctions before filter', response);
          response.forEach( (auction) => {
            // if (auction.productObject[0] == '{') {
              // auction.productObject = JSON.parse(auction.productObject);
            // }
            // this.onGoingAuctions
            // return (auction.startAuction);
           if ( auction.startAuction ) {
             this.onGoingAuctions.push( auction );
           };
          });          
console.log("AFTER",this.onGoingAuctions); 
 
        this.onGoingAuctions.forEach( (auction) => {         
          auction.productObject = JSON.parse(auction.productObject);
            });
          console.log("EVERAFTER",this.onGoingAuctions);
        }, (error) => {
          console.log('Error ', error);
        });
    }


    private deepCopy(myAuction) {

      return JSON.parse(JSON.stringify(myAuction))
    }


       private getAuctionss() {
      this.auctionService.getAuction().subscribe(
        (response: any) => {
          console.log('All ongoing auctions', response);
          this.auctionOnProductId = response.auctionProductId;
          this.onGoingAuctionss = response.filter(auction => {
            this.onGoingAuctionss.forEach(element => {
            if (auction.productObject[0] == '{') {
              auction.productObject = JSON.parse(auction.productObject);
            }
            console.log('All ongoing auctions',  this.onGoingAuctions);
            this.ttta = auction._id; });
            console.log('All equal auctions', this.ttta);
            return (auction.startAuction);
          });
          console.log('For auctions with start button', this.onGoingAuctions);
          // this.allProductss = response;
        }, (error) => {
          console.log('Error ', error);
        });
    }

    // this.Usersauction.forEach(element => {
    //   if (element.useremail === user['email']) {
    //     console.log('Matched!');
    //     console.log('auctid', element.auctionid);
    //     this.usersauctionid = element.auctionid;

    //   }
    // });

    public getProductById() {
      this.adminproductService.getAdminProductById(this.productId).subscribe(
        (response: any) => {
          console.log('respone gfhgfhfghhg ', response);
          this.viewedProduct = response;
        },
        (error) => {
          console.log('Error ', error);
        });
    }

  

 
   

//for users' login submit
// //for complete table on init
// public getProducts() {
//   this.adminproductService.getAdminProduct().subscribe(
//     (response: any) => {
//       console.log('respone gfhgfhfghhg ', response);
//       this.allProducts = response;
//     }, (error) => {
//       console.log('Error ', error);
//     });
// }
// //for complete table on init

}
