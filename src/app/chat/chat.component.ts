import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { IChat } from '../interfaces/ichat';
import { ChatService } from '../services/chat.service';
import { AdminproductService } from '../shared/adminproduct.service';
import { AuctionService } from '../shared/auction.service';
import { BidService } from '../shared/bid.service';
import { AucttimeService } from '../shared/aucttime.service';
import { AuctionuserService } from '../shared/auctionuser.service';

declare const $: any;


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [AuctionService, AucttimeService, AuctionuserService]
})
export class ChatComponent implements OnInit, AfterViewInit {
  public viewedAuctionParsed: any;
  public viewedthisProduct: any;
   public getprodbyid: any;
  // private minimumBidAmount = 0;
  public auctioningProduct: any;
  public myAuctionsss: any;
  public allTimes: any;
  public canGetTime: any;
  public allAucttime: any[] = [];
  public btime: any;
  public maxBid: any[] = [];
  public userAuctionId: any;
  public bidWinner: any;
  public auctionWinner: any;
  public numberedBid: number;
  public resOfTime: boolean = false;
  public finishedBid: boolean = false;
  private timeMessage: boolean = false;
  private auctionClosed: boolean = false;
  private loader: any;
  private auctionId: string;
  private viewedAuction: any = null;
  public auctionEndTime: any;

  public universalTime:number;

  private viewedProduct: any = null;
  private onlyMyAuctions: any = null;
  private loggedInUser: any;
  public parsedUser: any;
  public winningUser: any;
  public wrongInput: string = '';
  public showError: boolean = false;
  public minimumBidAmount: number = 0;
  private auctionprodId: {};
  public allBids: any[] = [];
  public canGetBids: boolean = false;
  public auctionTimer: any;
  chats: IChat[] = [];
  message: string;
  sending: boolean;

  constructor(private activeRoute: ActivatedRoute,
    private auctionuserService: AuctionuserService,
    private aucttimeService: AucttimeService,
    private adminprodService: AdminproductService,
    private _chatService: ChatService,
    private router: Router,
    private auctionService: AuctionService,
    private _bidService: BidService) {
    activeRoute.params.subscribe(param => {

      this.auctionId = param.id;
      console.log('thi ID', this.auctionId);
      // this.getAuctionById();
      this.loggedInUser = localStorage.getItem('current_user');
      this.parsedUser = JSON.parse(this.loggedInUser);
      if (!this.timeMessage) {
        setInterval(() => {
      
          this.getAllBids();
          if (this.canGetTime) {
           this.universalTime -= 3;
           this.updateAuctionTimer();
          }
          
          

          // this.getTime();
        }, 3000);
      }
      console.log('Params ', param);
    });
    // this.getAllTimes();
  }

  ngOnInit() {
     // console.log ('ddd' this.auctionTimer);
    this.loader = true;
    // this.getAllMyAuctions();
    this.getAuctionById();
    // subscribe to pusher's event
    this.joinAuction(this.loggedInUser);

    this._chatService.getChannel().bind('chat', data => {
      if (data.email === this._chatService.user.email) {
        data.isMe = true;
      }
      console.log('Chat Components data ', data);
      this.chats.push(data);
    });
    // this.saveAuctionTimer();
    // this.getAllTimes();
  }

  ngAfterViewInit() {
    // this.getprod();
    // this.getTimes()
    // this.getTimess()
    // this.getTime();
    // this.getAllTimes();

    // this.realGetTime()
  }


  // public getAuctionById() {
  //   this.auctionService.getAuctionsById(this.auctionId).subscribe(
  //     (response: any) => {
  //         console.log('auction response', response);
  //       this.getProductsById(response.auctionProductId);
  //       console.log('respone gfhgfhfghhg ', response);
  //       this.viewedAuction = response;
  //       this.viewedAuction['productObject'] = JSON.parse(this.viewedAuction['productObject']);
  //       console.log('respone viewed auction ', this.viewedAuction);
  //     },
  //     (error) => {
  //       console.log('Error ', error);
  //     });
  // }

  // public getAuctionById() {
  //   this.auctionService.getAuctionById(this.auctionId).subscribe(
  //     (response: any) => {
  //       response['startAuction']

  //       this.getProductsById(response.auctionProductId);
  //       console.log('respone gfhgfhfghhg ', response);
  //       this.viewedAuction = response;
  //       this.viewedAuction['productObject'] = JSON.parse(this.viewedAuction['productObject']);
  //       console.log('respone viewed auction ', this.viewedAuction);
  //       // this.viewedAuction['']
  //     },
  //     (error) => {
  //       console.log('Error ', error);
  //     });
  // }



  public saveAuctionUser() {
    const usera = JSON.parse(this.loggedInUser);
    console.log('w', usera);
  const doAuctionuser = {
   useremail: usera.email,
    auctionproduct: JSON.stringify(this.viewedAuction)
    // auctionid: this.viewedAuction,
    // console.log('g', auctionid);
      
   };
   
   this.auctionuserService.postAuctionuser(doAuctionuser).subscribe(
     (response: any) => {
       console.log('auctionuser', response);
     },
     (error) => {});
    }




    // public getAuctionById() {
    //   this.auctionService.getAuctionById(this.auctionId).subscribe(
    //     (response: any) => {
    //       console.log('gfhgfhfghhg ', response);
    //       response.productObject = JSON.parse(response.productObject);
    //       console.log('gfhg ', response);
    //       this.getProductsById(response.auctionProductId);
          
    //       // this.viewedAuction = response;
    //     },
    //     (error) => {
    //       console.log('Error ', error);
    //     });
    // }



   public getAuctionById() {

    this.auctionService.getAuctionById(this.auctionId).subscribe(
      (response: any) => {
        this.viewedAuction = response;
console.log('tr', this.viewedAuction);
        this.saveAuctionUser();
        // if(this.viewedAuction.productObject[0] == "{"){
          this.viewedAuctionParsed = JSON.parse(this.viewedAuction.productObject);
        // }
        console.log('gh', this.viewedAuctionParsed);
        this.canGetTime = true;
        if (response.time) {
          this.universalTime = response.time;
        } else {
          this.universalTime = 480;
        }
        // this.getProductsById(response.auctionProductId);
        this.adminprodService.getAdminProductById(this.viewedAuction.auctionProductId).subscribe(
          (resp: any) => {
            // console.log('r for getprodbyid ', resp);
            // this.viewedthisProduct = resp;
            this.canGetBids = true;
          },
          (error) => {
            console.log('Error ', error);
          });
       this.setViewTimer();
      //  this.viewedAuction = response;
        // console.log ('this', this.viewedAuction);
        // this.viewedAuction = response.filter(auction => {
          // this.viewedAuction.forEach(element => {
          // if (auction.productObject[0] == '{') {  
          return (response.startAuction);
        // });
      // });
        // this.viewedAuction['productObject'] = JSON.parse(this.viewedAuction['productObject']);
        // return (response.startAuction)
        // console.log('respone viewed auction ', this.viewedAuction);
        // this.viewedAuction[''];
        
      },
      (error) => {
        console.log('Error ', error);
      });
  }
  // public getprod() {
    // this.adminprodService.getAdminProductById(this.viewedAuction.auctionProductId).subscribe(
    //   (response: any) => {

    //     console.log('r for getprodbyid ', response);
    //     this.viewedthisProduct = response;
    //     this.canGetBids = true;
    //   },
    //   (error) => {
    //     console.log('Error ', error);
    //   });
  // }

  public getAllBids() {
  
    const user = JSON.parse(this.loggedInUser);
    let minimumBidAmount = 0;
    let winner: any = user;
  
    let biddingDate;
    this._bidService.getBidByAuctionId(this.auctionId).subscribe(
      (bidResponse: any[]) => {
        bidResponse.forEach(bid => {
          if (bid['userObject']) {
            bid['userObject'] = JSON.parse(bid['userObject']);
            // console.log('Other email',bid['userObject']['email'], 'User Email',user['email'])
            if (bid['userObject']['email'] == user['email']) {
              // console.log('Matched!')
            }
            if (parseInt(bid['finalbid']) > minimumBidAmount) {
              minimumBidAmount = bid['finalbid'];
              winner = bid['userObject'];
            }
          }
        })
        this.btime = bidResponse['bidtime'];
        console.log ('beetime', this.btime);
        this.minimumBidAmount = minimumBidAmount;
        this.auctionWinner = winner;
        console.log('AUCTION WINNER::', this.auctionWinner);
        this.allBids = bidResponse;
        this.loader = false;
        console.log('All bids response ', this.allBids);
        if (this.timeMessage && !this.auctionClosed) {
          this.sendWinnerMessage(this.auctionWinner);
          this.toggleAuction( this.viewedAuction);
        }
       
      },
      (error) => {
        console.log('An error Occurred');
      }
    )
  }

  private setViewTimer(){
     // console.log('respone g ', response);
     const newTime = JSON.parse(JSON.stringify(this.universalTime));
     console.log('newtime', newTime);
     //  const days = Math.floor(newTime / (1000 * 60 * 60 * 24));
     //  console.log('days', days);
   // const hours = Math.floor((newTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   // console.log('hours', hours);
   // const minutes = Math.floor((newTime % (1000 * 60 * 60)) / (1000 * 60));
   // const seconds = Math.floor((newTime % (1000 * 60)) / 1000);

//  const minutes = Math.floor((newTime / ( 60)));
let minutes = (newTime/60).toString().split('.')[0];
let seconds = newTime%60;
 console.log('minutes', minutes);
//  const seconds = Math.floor((newTime % (newTime / ( 60))));
 console.log('seconds', seconds);
 // const seconds = Math.floor((newTime % (1000 * 60)) / 1000);

   this.auctionTimer =
   //  days + "d " + hours + "h "
     minutes + "m " + seconds + "s ";
     console.log('newtimes', this.auctionTimer);
     // this.auctioningProduct = response;
     // console.log('e', this.auctioningProduct);

     if (newTime <= 0) {
       // clearInterval(x);
       // document.getElementById("demo").innerHTML = "EXPIRED";
       this.auctionTimer = "THIS AUCTION HAS BEEN CONCLUDED!";
       // this.resOfTime = true;
       this.timeMessage = true;
       // that.checkMaxBid();
       // that.getMaxBid();
       // this.finishedBid = true;
       // that.sendWinnerMessage();
       // alert('hey!');
     }
  //  else {
  //      // alert(distance);
  //      this.auctionTimer = minutes + "m " + seconds + "s "};
  // }

    }

  public sendWinnerMessage(user) {
    const mailObject = {
      firstName: user.firstname,
      lastName: user.lastname,
      productName: this.viewedAuctionParsed.productname,
      auctionRef: `${this.viewedAuctionParsed.productcode}${this.auctionId}`,
      auctionId: this.auctionId,
      userId: user._id,
      email: user.email,
      // auctionProductId:this.viewedProduct._id,
      auctionStartAmount: this.viewedAuctionParsed.auctionStartAmount,
      productObject: this.viewedAuctionParsed,
    }
    console.log('about to send winner message');
    this.auctionService.postWinner(mailObject).subscribe(
      (res) => {
        this.auctionClosed = true;
        console.log('winnnnn', res)
      },
      (error) => {
        console.log('error in email', error)
      })
  }


public updateAuctionTimer() {
  console.log ('this.universal time', this.universalTime);
  this.viewedAuction['time'] = this.universalTime;
    this.auctionService.putAuction(this.viewedAuction, this.auctionId).subscribe(
      (res) => {
        this.setViewTimer();
        // this.allTimes.push(res);
       },
      (error) => {
      },
      () => {

      });
    }
   
   
      public getProductsById(id) {
    this.adminprodService.getAdminProductById(id).subscribe(
      (response: any) => {

        console.log('r for getprodbyid ', response);
        this.viewedProduct = response;
        this.canGetBids = true;
      },
      (error) => {
        console.log('Error ', error);
      });
  }

  /**
   * Join the Auctions
   */
  public joinAuction(user) {

    const newUser = JSON.parse(user);
    this._chatService.join(newUser)
      .subscribe((resp) => {
        const data = { displayName: newUser['lastname'], email: newUser['email'] };
        const respData = Object.assign(resp, data);
        this.chats.push(respData);
        // this.loader = false;
        console.log("Current user parsed", );
      },
        (error) => {
          console.error(error);
          // this.loader = false;
        });
  }

  removeShowError() {
    this.showError = false;
  }
  // sendMessage(message) {

  //   // this.removeShowError();
  //   const newUser = JSON.parse(this.loggedInUser);
  //   this._chatService.sendMessage(message)
  //     .subscribe(resp => {
  //       const respData = Object.assign(newUser, resp);
  //       this.allBids.push(respData);


  //       console.log('Chat response', resp);
  //       //  this.message = undefined;
  //       this.sending = false;
  //     }, err => {
  //       this.sending = false;
  //       this.message = null;
  //     });
  // }

  sendComment(message) {
    // this.getAllTimes();

    this.sending = true;
    this.showError = false;
    if (!message) {
      this.sending = false;
      this.showError = true;
      this.wrongInput = 'Please enter an amount!';
      return;
    }
    if (message && (parseInt(message) <= this.minimumBidAmount)) {
      this.wrongInput = 'You must bid higher than the minimum!';
      $('#bidId').val(null);
      this.showError = true;
      this.sending = false;
      return;
    }

    const newUser = JSON.parse(this.loggedInUser);
    // alert( newUser['_id']);
    const bidObject = {
      userid: newUser['_id'],
      auctionid: this.auctionId,
      finalbid: message,
      userObject: newUser
    }
    this._bidService.postBid(bidObject).subscribe(
      (bidResponse) => {
        this.allBids.push(bidResponse);
        this.message = null;
        this.sending = false;
        this.sending = false;
        $('#bidId').val(null);
      },
      (error) => {
        this.sending = false;
        this.message = null;
        // console.log('An eror occurred');
        alert('error');
      })
  }
  // public getAllTimes(){
  //   this.getTime();
  // }

  // public getTime() {
    
  //   var countDownDate = (new Date().getTime() + 3 * 60 * 1000);
  //   var countDownDates = new Date("Dec 23, 2018 17:07:00").getTime();
  //   // const nows = new Date(Date.now() + (5 * 60 * 1000));
  //   const that = this;
  //   // To update the count down every 1 second
  //   var x = setInterval(() => {

  //     // To get today's date and time
  //     var now = new Date().getTime();
     
  //     // To find the distance between now and the count down date
  //     var distance = countDownDate - now;
  //     console.log('distance', distance);
  //     // var distances = +this.universalTime - 0;
  //     //       // var distance = nows - now;

  //     // Time calculations for days, hours, minutes and seconds
  //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //     // Output the result in an element with id="demo"
  //     // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  //     // + minutes + "m " + seconds + "s ";
  //     this.auctionTimer = days + "d " + hours + "h "
  //       + minutes + "m " + seconds + "s ";

  //     console.log('Auction Timer: ', that.auctionTimer)

  //     // If the count down is over, write some text 
  //     if (distance <= 0) {
  //       clearInterval(x);
  //       // document.getElementById("demo").innerHTML = "EXPIRED";
  //       this.auctionTimer = "THIS AUCTION PROCESS HAS BEEN CONCLUDED!";
  //       // this.resOfTime = true;
  //       this.timeMessage = true;
  //       // that.checkMaxBid();
  //       // that.getMaxBid();
  //       // this.finishedBid = true;
  //       // that.sendWinnerMessage();
  //       // alert('hey!');
  //     } else {
  //       // alert(distance);
  //       this.auctionTimer = days + "d " + hours + "h "
  //         + minutes + "m " + seconds + "s ";
      
  //       // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  //       // + minutes + "m " + seconds + "s ";
  //     }
  //   }, 1000);
  // }




  public backToDashboard() {
    this.router.navigateByUrl('/userdashboard')
   }

   private deductTime(){ }


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
}





