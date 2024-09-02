import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable, of, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products! : Array<Product>;

  erroMessage! : string;

  searchFormGroup !: FormGroup;

  currentPage: number = 0;
  total_pages= 0;
  page_size=5;

  searchCondition = 'all';

  condition = true;


  constructor(private productService:ProductService,
              public fb : FormBuilder,
              public auth : AuthentificationService,
              public router : Router) {

  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword :this.fb.control(null)

    })




    // this.products = this.productService.getallproducts();
    // this.handleGetAllProduct();

  //   2
      this.handleGetpageProduct();

  }


  // handleDeleteProduct(c: Product) {
  //   let index = this.products.indexOf(c);
  //   this.products.splice(index, 1);
  //   this.productService.deleteProduct(index);
  // }

  handleGetAllProduct(){
    this.searchCondition = 'all';
    this.productService.getallproducts().subscribe({
      next : value => {
        this.products = value

      },

      error : err => {
        this.erroMessage = err
      }


    });
  }
  handleGetpageProduct(){
    this.searchCondition = 'all';
    this.productService.getpageproducts(this.currentPage, this.page_size).subscribe({
      next : value => {
        this.products = value.products
        this.total_pages = value.totalpages
        console.log(this.total_pages)
      },

      error : err => {
        this.erroMessage = err
      }


    });
  }

  handleDeleteProduct(c: Product) {
    let conf = confirm("Etes vous sure ???")
    if (conf) {
      this.productService.deleteProduct(c.id).subscribe({
        next : value => {
          // this.handleGetAllProduct();

          // ici je consome un thread dans le backend
          // je le demande a nouveau de traiter une requete
          //sa ç'est pas mieux
          let index = this.products.indexOf(c);
          this.products.splice(index, 1);

        }
      })
    }else {
      return ;
    }

  }

  handlePromotion(c:Product) {
    let bool = c.promotion;
    this.productService.setPromotion(c.id).subscribe({
      next : (data)=>{
        c.promotion = bool ? false: true ;
      },

      error :err => {
        this.erroMessage=err;
      }
    })

  }

  handlesearchProduct() {
    this.searchCondition = 'search';


    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProduct(keyword, this.currentPage, this.page_size).subscribe({
      next : (value) => {
        this.products = value.products
        this.total_pages = value.totalpages
        if (this.condition){
          this.currentPage=0
          this.handlesearchProduct()
          this.condition = false
        }


      },
      error :(err: string) => {
        this.erroMessage = err;
      }
    })
  }



  switchPage(i : number) {
    this.currentPage = i;
    if (this.searchCondition === 'search'){

      this.handlesearchProduct();
      console.log(this.searchCondition+"--------"+this.currentPage)
    }else{
      this.handleGetpageProduct();
      console.log(this.searchCondition)
    }
  }


  handleNewProduct() {
    this.router.navigateByUrl("/admin/newProduct");
  }

  handleUpdateProduct(c: Product) {
    this.router.navigateByUrl("/admin/edit/"+c.id);

  }
}
