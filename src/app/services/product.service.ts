import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {pagProduct, Product} from "../model/product.model";
import { UUID } from 'angular2-uuid';
import {AuthentificationService} from "./authentification.service";
import {FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products! : Array<Product>;

  constructor() {
    this._products=[

      {id:UUID.UUID(), name:"hp", price: 1000, promotion : true},
      {id:UUID.UUID(), name:"printer", price: 1000, promotion : false},
      {id:UUID.UUID(), name:"Dell", price: 1000, promotion : true}

    ]
    for (let i = 0; i < 10; i++) {
      this._products.push({id:UUID.UUID(), name:"hp", price: 1000, promotion : true})
      this._products.push({id:UUID.UUID(), name:"Dell", price: 1000, promotion : i %2 ? true : false})


    }

  }

  getpageproducts(page : number, size : number) : Observable<pagProduct> {
    let index=page*size;                                //si je veux 2emme page, l'index de depart des produits a affichier c'est 2*size(5) = 10
    let total_pages = ~~(this._products.length/size);
    if (this._products.length % size != 2){
      total_pages++;
    }
    let pageProducts = this._products.slice(index, index+size)
    return of({page: page, size:size, totalpages:total_pages, products : pageProducts})



  }

  getallproducts() : Observable<Product[]> {
    let rnd = Math.random();
    if (rnd <0.1) return throwError(() =>new Error("Internet connexion error !!"))
    else return of([...this._products]);
  }

  // deleteProduct(c: number) {
  //   let pde : Product[] = this._products.filter(p => {p.id == c});
  //   return this._products.filter(p=> {
  //     p.id != pde[0].id
  //   });
  // }

  deleteProduct(c: string) : Observable<boolean> {
    this._products = this._products.filter(p=>p.id != c)
    return of(true)
  }

  setPromotion(id : string) : Observable<boolean>{

    let Produit = this._products.find(p => p.id == id)
    if (Produit != undefined){
      Produit.promotion = Produit.promotion ? false: true ;
      return of(true)

    }else return throwError( ()=> new Error("Produit inExistant !!!"))

  }

  // searchProduct(key : string) :Observable<Product[]>{
  //   let product = this._products.filter(p=> p.name.includes(key))
  //
  //   if (product != undefined) {
  //     return of(product)
  //
  //   }
  //   return throwError(() => new Error("Produit inExistant !!!"))
  //
  // }
  searchProduct(key : string ,page : number, size : number) : Observable<pagProduct> {
    let product = this._products.filter(p=> p.name.includes(key))
    let index = page * size;                                //si je veux 2emme page, l'index de depart des produits a affichier c'est 2*size(5) = 10
    let total_pages = ~~(product.length / size);
    if (product.length % size != 2) {
      total_pages++;
    }
    let pageProducts = product.slice(index, index + size)
    if (product != undefined) {
        return of({page: page, size: size, totalpages: total_pages, products: pageProducts})

    }
    return throwError(() => new Error("Produit inExistant !!!"))
  }

  addProduct(name : string, price : number, promo : boolean) : Observable<Product>{
    let newProduct: Product = {id : UUID.UUID(), name : name, price: price, promotion : promo}
    this._products.push(newProduct)
    return of(newProduct)
  }

  getProduct(id : string) : Observable<Product>{
    let produit = this._products.find(p => p.id == id);
    if (produit != undefined)
      return of(produit);
    else {
      return throwError(() => new Error("Produit inExistant !!!"))
    }
  }



}
