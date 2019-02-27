import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage';
// import { FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import { RegistrationService } from '../shared/registration.service';
import {AdminproductService} from '../shared/adminproduct.service';
import {Adminproduct} from "../shared/adminproduct.model";

declare const $: any;

@Component({
  selector: 'app-adminproductstable',
  templateUrl: './adminproductstable.component.html',
  styleUrls: ['./adminproductstable.component.css'],
  providers: [RegistrationService, AdminproductService]
})

export class AdminproductstableComponent implements OnInit {
  
  // from add new product
  public prodimage: any;
  public productId: string;
  selectedFile = null;
  public productsForm: FormGroup;
  public allProducts: any = [];
  public allProductsss: any = [];
  public load = {
    requesting: false
  };
  public imageUrl: any;
  public getimageUrl: any;
  uploadProgress: Observable<number>;
  uploadState: Observable<any>;
  downloadURL: Observable<string>;
  // downloadURL: any;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  public currentUser = {};
  // public allProducts: any = [];
  public productToEdit = null;
  public editorReady: boolean;
  // public productsForm: FormGroup;
  public editProductsForm: FormGroup;
  public loads = {
    requesting: false,
  }

  // featuredPhotoStream: AngularFireObject<FeaturedPhotosUrls>;
  // constructor(
  //  )
  // {
  
    // this.featuredPhotoStream = this.db.object('/photos/featured');

//  }
 // from add new product

  static productsForm = () => {
    return {
      productname: ["", Validators.required],
      productcode: ["", Validators.required],
      minauctionprice: ["", Validators.required],
      description: [""],
      // productimage: [""],
      auctiondate: [ "", Validators.required],
      auctiontime: [ "", Validators.required],
      // finalamountbidded: ["", Val,,idators.required],
    }
  }
  static editProductsForm = () => {
    return {
      productname: ['', Validators.required],
      productcode: ['', Validators.required],
      minauctionprice: ['', Validators.required],
      description: [''],
      // productimage: this.prodimage,
      productimage: [''],
      auctiondate: [ '', Validators.required],
      auctiontime: [ '', Validators.required],
      // finalamountbidded: ["", Validators.required],
    };
  }

  constructor( private afStorage: AngularFireStorage,
    // private adminproductService: AdminproductService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient, private db: AngularFireDatabase,
    private adminproductService: AdminproductService,
              private fb: FormBuilder)
  {
    this.productsForm = this.fb.group(AdminproductstableComponent.productsForm());
    this.editProductsForm = this.fb.group(AdminproductstableComponent.editProductsForm());
  }

  ngOnInit() {
    this.editorReady = false;
    
    // this.resetForm();
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.getProducts();

    this.currentUser = JSON.parse(localStorage.getItem('current_user'));
    console.log('Current User', this.currentUser);

  }

  async upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(
      // map(s => s.state)
    await  finalize(
        () => {
          this.downloadURL = this.ref.getDownloadURL();
          this.downloadURL.subscribe(
               (response: any ) => {
                // console.log('DOOOOOWNNNNNNNNNNNLOOOOOOOOOOAD: ', response);
                this.prodimage = response;
                console.log('DOOOOOAD: ', this.prodimage);
                // alert(this.prodimage);
            });

          // this.getimageUrl = this.downloadURL;
    // console.log('rrrrrrrr', this.getimageUrl);
        }


       )
    );
    // console.log('DOwloadurl: ', this.downloadURL);
  //   this.downloadURL.subscribe(
  //     (response: any ) => {
  //     console.log('DOOOOOWNNNNNNNNNNNLOOOOOOOOOOAD: ', response);
  //     this.prodimage = response;
  //     console.log('DOOOOOAD: ', this.prodimage);
  //     alert(this.prodimage);
  // });
    

    this.uploadProgress = this.task.percentageChanges();
    // this.downloadURL = this.task.downloadURL();
    //  this.getimageUrl = this.ref.getDownloadURL().subscribe(
    //   (res) =>{
    //     this.imageUrl.push(res);
    //     console.log('this image url', this.imageUrl);
    //   },
    //   (error) => {

    //   },
    //   () => {

    //   });
  
  }
  // onFileSelected(event) {
     // console.log(event);
    // this.selectedFile = event.target.files[0];
  // }
  // featuredPhotoSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   const metaData = {'contentType': file.type};
  //   const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/featured/url1');
  //   storageRef.put(file, metaData);
  //   console.log("Uploading: ", file.name);
  // }
  onSubmitproductsForm() {
    this.loads.requesting = true;
    const productObjectToSubmit = this.productsForm.value;
    productObjectToSubmit['productimage'] = this.prodimage;
    this.adminproductService.postAdminproduct(productObjectToSubmit).subscribe(
      (res) => {
        this.load.requesting = false;
        this.allProductsss.push(res);
        this.productsForm.reset();

      }, 
      (error) => {
        this.load.requesting = false;

      },
      () => {

      });
  }

  addId(data) {
    
    this.editProductsForm.patchValue(data);
    this.productToEdit = data;
    
console.log('ththt', data._id);
  }


  onSubmitEditedProduct() {
    this.load.requesting = true;
    this.adminproductService.putAdminProduct(this.editProductsForm.value, this.productToEdit['_id']).subscribe(
      (res) => {
        this.load.requesting = false;
        this.allProductsss.push(res);
        this.productsForm.reset();

       },
      (error) => {
        this.loads.requesting = false;

      },
      () => {

      });
  }

//for complete table on init
  public getProducts() {
    this.adminproductService.getAdminProduct().subscribe(
      (response: any) => {
        this.allProductsss = response;
        console.log('respone gfhgfhfghhg ', this.allProductsss);
        }, (error) => {
        console.log('Error ', error);
      });
  }
//for complete table on init

  //for submitting new product
  onSubmit() {
    this.load.requesting = true;
    this.adminproductService.postAdminproduct(this.productsForm.value).subscribe(
      (res) => {
        this.load.requesting = false;
        // this.allProducts.push(res);
        this.productsForm.reset();

       },
      (error) => {
        this.load.requesting = false;

      },
      () => {

      });
  }
  //for submitting new product

  // editing a product code
  public editAProduct(product: any) {
    this.productToEdit = product;
    this.editorReady = true;
    $('#mediumModal').modal('show');
  }

  public saveEditedProduct(_id: string, i) {
  this.adminproductService.putAdminProduct(this.productToEdit, this.productToEdit['_id']).subscribe(res => {
    console.log('Res ', res);
  }, err => {
    console.log('oiuyfdfghkjl', err);
  });
  }
  // end editing a product

  //switching toggle
  public toggleAdminProduct(product){
    product.status = (product.status.toString() == '0') ? 1 : 0;
    this.adminproductService.toggleAdminProduct(product).subscribe(res => {
      console.log('Res ', res);
    }, err => {
      console.log('oiuyfdfghkjl', err)
    });
  }
  //switching toggle

  //deleting a product
  public deleteAProduct(product, _id: string, i) {
    if (confirm('confirm delete?') == true) {
    this.adminproductService.deleteProduct(product._id).subscribe((res) => {
      this.allProductsss.splice(i, 1);
    }, err => {
        
    });
    
  }

}

}


