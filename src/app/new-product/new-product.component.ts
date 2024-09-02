import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../services/authentification.service";
import {ProductService} from "../services/product.service";
import {min} from "rxjs";


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {

  public NewProductFormgroup !: FormGroup;


  constructor(private fb : FormBuilder,
              private pservice : ProductService,
              protected auth : AuthentificationService) {
    this.NewProductFormgroup = this.fb.group({

      name : this.fb.control(null, [Validators.required, Validators.email]),
      price : this.fb.control(null, [Validators.required, Validators.min(0)]),
      check : this.fb.control(null)
    })
  }
  //
  // id : string;
  // name : string;
  // price : number;
  // promotion : boolean

  handleaddProduct() {
    let name = this.NewProductFormgroup.get('name')?.value;
    let price = this.NewProductFormgroup.get('price')?.value;
    let check = this.NewProductFormgroup.get('check')?.value;
    this.pservice.addProduct(name, price, check).subscribe({
      next : value => {
        alert('Added Product !!!');
        this.NewProductFormgroup.reset();
      },
      error : err => {
        console.log(err);
      }
    })
  }

  gestionErrors(field : string,NewProductFormgroup : FormGroup )  {
    let control = NewProductFormgroup.get(field);

    if (control?.hasError('required')){
      return field + ' is required !!!'

    }else if (control?.hasError('minlength')){
      const minlenght = control?.getError('minlenght');
      return field + 'min is '+minlenght;

    }else if (control?.hasError('min')) {
      const minl = control?.getError('min').min;
      return field + ' the min limit is ' + minl;
    }
    return undefined

  }

  protected readonly AuthentificationService = AuthentificationService;
}
