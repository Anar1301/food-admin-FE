export type categoryidType = {
  _id: string;
  name: string;
};
export type Dish = {
  name: string;
  ingredients: string;
  price: number;
  category: string;
  image: string;
  _id: string;
  categorid: categoryidType;
};
export type Category = {
  _id: string;
  name: string;
};
