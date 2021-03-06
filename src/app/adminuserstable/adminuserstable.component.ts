import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, NgForm, Validators} from "@angular/forms";


import {RegistrationService} from '../shared/registration.service';
import {Registration} from "../shared/registration.model";

declare const $: any;


@Component({
  selector: 'app-adminuserstable',
  templateUrl: './adminuserstable.component.html',
  styleUrls: ['./adminuserstable.component.css'],
  providers: [RegistrationService]
})
export class AdminuserstableComponent implements OnInit {
  public addNewUsersForm: FormGroup;
  public currentUser ={};
  public allUserss: any = [];
  public allUsers: any = [];
  public usersToEdit = null;
  public editorReady: boolean;
  public usersForm: FormGroup;
  public editUsersForm: FormGroup;
  public load = {
    requesting: false,

  }

 static addNewUsersForm = () => {
    return {
      firstname: [""],
      lastname: [""],
      email: [""],
      password: [""],
      phonenumber: [""],
     }
  }


  constructor(private registrationService: RegistrationService,
              private fb: FormBuilder)
  {
    this.addNewUsersForm = this.fb.group(AdminuserstableComponent.addNewUsersForm());
  }

  ngOnInit() {
                    this.editorReady = false;
    // this.resetForm();
    this.getusers();

    this.currentUser = JSON.parse(localStorage.getItem('current_user'));
    console.log('Current User',this.currentUser);
  }


//for complete table on init
  public getusers() {
    this.registrationService.getRegistration().subscribe(
      (response: any) => {
        console.log('for All Reg. Users', response);
        this.allUsers = response;
      }, (error) => {
        console.log('Error ', error);
      });
  }
//for complete table on init

  //for submitting new product
  // onSubmit() {
  //   this.load.requesting = true;
  //   this.registrationService.postRegistration(this.productsForm.value).subscribe(
  //     (res) => {
  //       this.load.requesting = false;
  //       this.allUsers.push(res);
  //       this.productsForm.reset();

  //       this.resetForm(form);
  //       this.getProducts();

  //     },
  //     (error) => {
  //       this.load.requesting = false;

  //     },
  //     () => {

  //     });
  // }
  //for submitting new product

  // putRegistration(data, id) {
  //   return this.http.put(this.baseURL + '/' + id, data);
  // }
  // editing a product code

  public editAProduct(user: any) {
    this.usersToEdit = user;
    this.editorReady = true;
    $('#mediumModal').modal('show');
  }

  public saveEditedProduct(){
  this.registrationService.putRegistration(this.usersToEdit, this.usersToEdit['_id']).subscribe(res => {
    console.log('Res ', res);
  }, err => {
    console.log('oiuyfdfghkjl', err)
  });
  }
  // end editing a product

  //switching toggle
  public toggleRegistration(user){
    user.status = (user.status.toString() == '0') ? 1 : 0;
    this.registrationService.toggleRegistration(user).subscribe(res => {
      console.log('Res ', res);
    }, err => {
      console.log('oiuyfdfghkjl', err)
    });
  }
  //switching toggle


  // public toggleAdminProduct(product){
  //   product.status = (product.status.toString() == '0') ? 1 : 0;
  //   this.adminproductService.toggleAdminProduct(product).subscribe(res => {
  //     console.log('Res ', res);
  //   }, err => {
  //     console.log('oiuyfdfghkjl', err)
  //   });
  // }



 //for submitting new user
 onSubmitAddNewUsersForm() {
  this.load.requesting = true;
  this.registrationService.postRegistration(this.addNewUsersForm.value).subscribe(
    (res) => {
      this.load.requesting = false;
      this.allUserss.push(res);
      this.addNewUsersForm.reset();

     },
    (error) => {
      this.load.requesting = false;

    },
    () => {

    });
}
//for submitting new user

}


