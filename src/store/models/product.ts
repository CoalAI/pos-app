export interface ProductVarient {
  id?: number;
  productID?: number;
  color?: string;
  size?: string;
  description?: string;
  price?: number;
}

export interface Unit {
  id?: number;
  name?: number;
}

export interface Product {
  id?: number;
  unitID?: number;
  name?: string;
  barCode?: string;
  insertedDate?: Date;
}