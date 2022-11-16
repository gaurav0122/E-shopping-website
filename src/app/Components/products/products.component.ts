import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from './model/Product.model';
import { ProductserviceService } from './service/productservice.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:Product[];
  categoryName:string;
  loading:boolean = true;
  page:number=1;
  count:number=0;
  tableSize:number=6;

  constructor(private actroute:ActivatedRoute,private productservice:ProductserviceService) {
    this.categoryName="";
    this.products=[];
  }



  ngOnInit(): void {

    this.actroute.params.subscribe(
      params=>{
        this.loading=true;
        this.categoryName=params['cid'];
        this.productservice.getAllProductByCategory(this.categoryName).subscribe(
          data=>{
            this.products=data;
            this.loading=false;
            this.page=1;
          }
        );
      }
    );



  }


  sortLowToHigh(){
    this.products.sort((a,b)=> (a.price||0 ) - (b.price ||0));

  }

  sortHightoLow(){
    this.products.sort((a,b)=>  (b.price ||0) - (a.price||0 ) );

  }


  onProductDataChange(event:any){
    this.page=event;

  }
}
