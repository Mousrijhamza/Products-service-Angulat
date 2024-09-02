export interface Product {
  id : string;
  name : string;
  price : number;
  promotion : boolean
}

export interface pagProduct {
  products: Product[],
  page : number,
  size : number,
  totalpages : number
}

export interface User {
  Id : string,
  name : string,
  password : string,
  role : string[]

}
