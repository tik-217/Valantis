// react
import { lazy, useEffect } from "react";

// api
import { goodsFilterReq } from "../../api/goodsFilter";
import { goodsReq } from "../../api/goodsReq";

// components
const Goods = lazy(() => import("../Goods/Goods"));

// types
import { IGetGoodsProps, IItemsResponse } from "../../types";

// store
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectApiRes, selectLimit, selectOffset } from "../../store/selectors";
import { setApiRes } from "../../store/reducer";

export default function GetGoods({ submit }: IGetGoodsProps) {
  const offset = useAppSelector(selectOffset);
  const limit = useAppSelector(selectLimit);
  const apiRes = useAppSelector(selectApiRes);
  const dispatch = useAppDispatch();

  function deleteDublicate(result: IItemsResponse[]) {
    const map = new Map<string, IItemsResponse>();

    result.forEach((el) => map.set(el.id, el));

    const mapToArray = Array.from(map.values());

    dispatch(setApiRes(mapToArray));
  }

  function formatReq(
    action: string,
    params: { [key: string]: string | number | string[] }
  ) {
    let goods;

    if (action === "filter") {
      goods = goodsFilterReq(action, {
        ...params,
      });
    } else {
      goods = goodsReq(action, {
        ...params,
      });
    }

    goods
      .then((data) => data.json())
      .then(({ result }) => result)
      .then((res) => goodsReq("get_items", { ids: res }))
      .then((data) => data.json())
      .then(({ result }: { result: IItemsResponse[] }) =>
        deleteDublicate(result)
      )
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    const formNotEmpty = Object.values(submit).filter((el) => {
      if (typeof el === "string" && el.length !== 0) {
        return el;
      }

      if (typeof el === "number" && el !== 0) {
        return el;
      }
    });

    if (formNotEmpty.length === 0) {
      formatReq("get_ids", { ...submit, limit, offset });
    } else {
      formatReq("filter", { ...submit });
    }

    // eslint-disable-next-line
  }, [submit, offset]);

  return (
    <>
      {apiRes.map((el: IItemsResponse) => (
        <div className={"goods__item"} key={el.id + el.price}>
          <Goods
            id={el.id}
            product={el.product}
            price={el.price}
            brand={el.brand}
          />
        </div>
      ))}
    </>
  );
}
