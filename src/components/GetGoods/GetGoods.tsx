import { useEffect } from "react";

// api
import { goodsFilterReq } from "../../api/goodsFilter";
import { goodsReq } from "../../api/goodsReq";

// components
import Goods from "../Goods/Goods";

// types
import { IGetGoodsProps, IItemsResponse } from "../../types";

// store
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectApiRes,
  selectGoodsFilter,
  selectOffset,
} from "../../store/selectors";
import { setApiRes } from "../../store/reducer";

export default function GetGoods({ requestAction, payload }: IGetGoodsProps) {
  const offset = useAppSelector(selectOffset);
  const apiRes = useAppSelector(selectApiRes);
  const goodsFilter = useAppSelector(selectGoodsFilter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let goods;

    if (requestAction === "filter") {
      goods = goodsFilterReq("filter", {
        ...payload,
      });
    } else {
      goods = goodsReq("get_ids", {
        ...payload,
      });
    }

    goods
      .then((data) => data.json())
      .then(({ result }) => result)
      .then((res) => goodsReq("get_items", { ids: res }))
      .then((data) => data.json())
      .then(({ result }: { result: IItemsResponse[] }) => {
        const map = new Map<string, IItemsResponse>();

        result.forEach((el) => map.set(el.id, el));

        const mapToArray = Array.from(map.values());

        dispatch(setApiRes(mapToArray));
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, [offset, goodsFilter]);

  return (
    <>
      {apiRes.map((el: IItemsResponse) => (
        <div className={"goods__item"} key={el.id + el.price}>
          <Goods
            id={el.id}
            name={el.product}
            cost={el.price}
            brand={el.brand}
          />
        </div>
      ))}
    </>
  );
}
