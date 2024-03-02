export interface IItemsResponse {
  id: string;
  brand: string;
  price: number;
  product: string;
}

export interface IGoodsProps {
  id?: string;
  product: string;
  price: number;
  brand: string;
}

export interface IGetGoodsProps {
  submit: IGoodsProps;
}

export interface IInitialState {
  offset: number;
  apiRes: IItemsResponse[];
  limit: 50;
}
