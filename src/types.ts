export interface IItemsResponse {
  id: string;
  brand: null | string;
  price: number;
  product: string;
}

export interface IGoodsProps {
  id: string;
  name: string;
  cost: number;
  brand: string | null;
}

export interface IGetGoodsProps {
  requestAction: string;
  payload: { [key: string]: string | string[] | number };
}

export interface IInitialState {
  offset: number;
  apiRes: IItemsResponse[];
  limit: 50;
  goodsFilter: boolean;
}
