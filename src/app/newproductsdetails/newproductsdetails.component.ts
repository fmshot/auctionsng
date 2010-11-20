import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { Router } from "@angular/router";


import {AdminproductService} from "../shared/adminproduct.service";
import {AuctionService} from "../shared/auction.service";


@Component({
  selector: 'app-newproductsdetails',
  templateUrl: './newproductsdetails.component.html',
  styleUrls: ['./newproductsdetails.component.css'],
  providers: [AdminproductService]

})
export class NewproductsdetailsComponent implements OnInit {
  public iWillShowAuctions: boolean = false;
  public allShowProducts: boolean;
  // public removeShowAuctionButton3 = 'please login to view auctions!';
  // public removeShowAuctionButton2: boolean = false;
  // public removeShowAuctionButton: boolean = false;
  public loggedInUser: any;
  public toJoinAuctions: boolean = false;
  public auctionOnProductId = {};
  public onGoingAuctions: any[] = [];
  public allProductsss: any = [];
  private viewedProduct: any = null;
  private productId: string;
  private viewedAuction: any = null;
  private auctionId: string;
  public showForAdmin: boolean = false;
  public admin: any;

  constructor(private activeRoute: ActivatedRoute, private adminService: AdminproductService,  
      private router: Router,
     private auctionService: AuctionService) {
    activeRoute.params.subscribe(param => {
      this.loggedInUser = localStorage.getItem('current_user');
      this.admin = localStorage.getItem('current_admin')
      console.log('r', this.loggedInUser);
      this.productId = param.id;
      this.getProductById();

      console.log('Params ', param)
    })
  }


  ngOnInit() {
    if (this.admin){
    console.log('wou')
    this.showForAdmin = true;
    }
    if (this.loggedInUser) {
      // this.removeShowAuctionButton = true;
      // this.removeShowAuctionButton2 = true;
    }
    this.allShowProducts = true;
    this.getProducts();
    this.getAuctions();

  }

  //for complete table on init
  public getProducts() {
    this.adminService.getAdminProduct().subscribe(
      (response: any) => {
        this.allProductsss = response;
        console.log('respone gfhgfhfghhg ', this.allProductsss);
        }, (error) => {
        console.log('Error ', error);
      });
  }
//for complete table on init

  public getProductById() {
    this.adminService.getAdminProductById(this.productId).subscribe(
      (response: any) => {
        console.log('response for product Id ', response);
        this.viewedProduct = response;
        if ( this.viewedProduct.status === 1) {
          this.toJoinAuctions = true;
        }
      },
      (error) => {
        console.log('Error ', error);
      });
  }

  private getAuctions() {
    this.auctionService.getAuction().subscribe(
      (response: any) => {
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

  public getAuctionsById() {
    this.auctionService.getAuctionById(this.auctionId).subscribe(
      (response: any) => {
        console.log('respone gfhgfhfghhg ', response);
        this.viewedAuction = response;
        
      },
      (error) => {
        console.log('Error ', error);
      });
  }


  public allShowOngoings() {
  localStorage.setItem('forauctions', 'TRUE');
  }

  public backToDashboard() {
    this.router.navigateByUrl('/userdashboard')
   }

}
