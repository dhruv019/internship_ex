import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { restaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {
  image = '/assets/OIPP.png'
  formVal!: FormGroup;

  restaurantModel: restaurantData = new restaurantData;
  allRestaurantData: any = '';

  showAdd!: boolean;
  showbtn!: boolean;

  constructor(public fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formVal = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.max(10)],
      address: ['', Validators.required],
      Service: ['', Validators.required]
    })

    this.getAllData();

  }

  clickAddRestro() {
    this.formVal.reset();
    this.showAdd = true;
    this.showbtn = false;
  }

  //subscribiung data 

  addRestaurant() {
    this.restaurantModel.name = this.formVal.value.name;
    this.restaurantModel.email = this.formVal.value.email;
    this.restaurantModel.mobile = this.formVal.value.mobile;
    this.restaurantModel.address = this.formVal.value.address;
    this.restaurantModel.Service = this.formVal.value.Service;

    this.api.postRestaurant(this.restaurantModel).subscribe(res => {
      console.log(res);
      alert("Restaurant Records Addedd Succesfully!")

      let ref = document.getElementById('clear');
      ref?.click();

      this.formVal.reset();
      this.getAllData();
    },
      err => {
        alert("somthing is wrong");
      })
  }

  getAllData() {
    this.api.getRestaurant().subscribe(res => {
      this.allRestaurantData = res;
    })
  }


  deleteData(data: any) {
    this.api.deleteRestaurant(data.id).subscribe(res => {
      alert("Data is deleted Successfully")
      this.getAllData();
    })
  }


  editData(data: any) {
    this.showAdd = false;
    this.showbtn = true;
    this.restaurantModel.id = data.id;
    this.formVal.controls['name'].setValue(data.name)
    this.formVal.controls['email'].setValue(data.email)
    this.formVal.controls['mobile'].setValue(data.mobile)
    this.formVal.controls['address'].setValue(data.address)
    this.formVal.controls['Service'].setValue(data.Service)
  }

  updateData() {
    this.restaurantModel.name = this.formVal.value.name;
    this.restaurantModel.email = this.formVal.value.email;
    this.restaurantModel.mobile = this.formVal.value.mobile;
    this.restaurantModel.address = this.formVal.value.address;
    this.restaurantModel.Service = this.formVal.value.Service;

    this.api.putRestaurant(this.restaurantModel.id, this.restaurantModel).subscribe(res => {
      alert("Restaurant updated Succesfully")
      this.getAllData();
    })
  }


}