import { RootState } from "./store";

export const selectOffset = (state: RootState) => state.offset;
export const selectApiRes = (state: RootState) => state.apiRes;
export const selectLimit = (state: RootState) => state.limit;
export const selectGoodsFilter = (state: RootState) => state.goodsFilter;
