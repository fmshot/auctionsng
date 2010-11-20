import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {AuctionService} from '../shared/auction.service';
import {Auction} from '../shared/auction.model';
import {AdminproductService} from '../shared/adminproduct.service';
import {Adminproduct} from "../shared/adminproduct.model";

declare const $: any;


@Component({
  selector: 'app-adminauctionstable',
  templateUrl: './adminauctionstable.component.html',
  styleUrls: ['./adminauctionstable.component.css'],
  providers: [AuctionService]
})
export class AdminauctionstableComponent implements OnInit {
public auctionToEdit: any;
  public allProductss: any =[];

  public addNewAuctionsForm: FormGroup;
  public currentAuction ={};
  public allAuctions: any = [];
  public thisDate= {};
  public datebutton: boolean;
  public auctionsToEdit = null;
  public editorReady: boolean;
  public auctionsForm: FormGroup;
  public editAuctionsForm: FormGroup;
  public load = {
    requesting: false,
  };

  static addNewAuctionsForm = () => {
    return {
      startDateAndTime: [""],
      auctionProductId: [""],
      auctionStartAmount:[""],
      restartBid:[""],   
}
  }

  static editAuctionsForm = () => {
    return {
      startDateAndTime: [""],
      auctionProductId: [""],
      auctionStartAmount:[""],   
}
  }


  constructor(private adminproductService: AdminproductService,
              private auctionService: AuctionService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) 
  { 
    this.addNewAuctionsForm = this.fb.group(AdminauctionstableComponent.addNewAuctionsForm());

  }

  ngOnInit() {
    this.getProducts();

    this.editorReady = false;
    this.getauctions();
    this.currentAuction = JSON.parse(localStorage.getItem('current_user'));
    console.log('Current User',this.currentAuction);
  }
 

  //for all product needed in auction modal form
public getProducts() {
  this.adminproductService.getAdminProduct().subscribe(
    (response: any) => {
      console.log('respone gfhgfhfghhg ', response);
      this.allProductss = response;
    }, (error) => {
      console.log('Error ', error);
    });
}
  //for all product needed in auction modal form
  
  //for submitting new auctions
 onSubmitAddNewAuctionsForm() {
  this.load.requesting = true;
  const auctionProduct = this.allProductss.filter(product => {
    return product['_id'] == this.addNewAuctionsForm.value['auctionProductId'];
  })[0];

  this.addNewAuctionsForm.value ['productObject'] = auctionProduct;
  console.log('Auction object', this.addNewAuctionsForm.value);
  this.auctionService.postAuction(this.addNewAuctionsForm.value).subscribe(
    (res) => {
      console.log('re', this.addNewAuctionsForm.value);
      this.load.requesting = false;
      this.allAuctions.push(res);
      this.addNewAuctionsForm.reset();

     },
    (error) => {
      this.load.requesting = false;

    },
    () => {

    });
}
//for submitting new auction

//for complete table on init
  public getauctions() {
    this.auctionService.getAuction().subscribe(
      (response: any) => {
        console.log('response for all auctions ', response);
        // response.productObject = JSON.parse(response.productObject);
        // console.log('paresed response for all auctions ', response);
        response.forEach( (auctionsgoing) => {
         
          // auctionsgoing.productObject =  JSON.parse(auctionsgoing.productObject);
          return;
        });
         this.allAuctions = response;
      }, (error) => {
        console.log('Error ', error);
      });
  }

  //switching toggle
  public toggleAuction(auction){
    auction.startAuction = (auction.startAuction.toString() == '0') ? 1 : 0;
    this.auctionService.toggleAuction(auction).subscribe(res => {
      console.log('Res ', res);
    }, err => {
      console.log('oiuyfdfghkjl', err)
    });
  }
  //switching toggle

  //switching toggle
  public togglePaid(auction){
    auction.startAuction = (auction.paid.toString() == '0') ? 1 : 0;
    this.auctionService.togglePaid(auction).subscribe(res => {
      console.log('Res ', res);
    }, err => {
      console.log('oiuyfdfghkjl', err)
    });
  }
  //switching toggle

  addId(data) {
    
    this.editAuctionsForm.patchValue(data);
    this.auctionToEdit = data;
    
console.log('ththt', data._id);
  }
 }


