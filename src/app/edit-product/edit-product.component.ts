import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../model/product.model";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  id_prod!: string;
  Error !: string;
  produit !: Product;
  foorm! : FormGroup

  constructor(private cproduit : ProductService,
              private aroute : ActivatedRoute,
              public fb : FormBuilder) {
    this.id_prod = this.aroute.snapshot.params['id'];


  }


  ngOnInit(): void {
    let product = this.cproduit.getProduct(this.id_prod).subscribe({
      next : value => {
        this.produit = value,
        this.foorm = this.fb.group({

          name : this.fb.control(this.produit.name, [Validators.required, Validators.email]),
          price : this.fb.control(this.produit.price, [Validators.required, Validators.min(0)]),
          check : this.fb.control(this.produit.promotion )
        })
      },
      error : err => {
        this.Error = err
        console.log(err)
      }
    });
  }



}
