// react
import { Suspense, lazy, useEffect, useState } from "react";

// components
const Pagination = lazy(() => import("../Pagination/Pagination"));
const GetGoods = lazy(() => import("../GetGoods/GetGoods"));

// store
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectGoodsFilter,
  selectLimit,
  selectOffset,
} from "../../store/selectors";
import { setGoodsFilter } from "../../store/reducer";

// react-hook-form
import { FieldValues, useForm } from "react-hook-form";

// styles
import "./App.css";

export default function App() {
  const offset = useAppSelector(selectOffset);
  const limit = useAppSelector(selectLimit);
  const goodsFilter = useAppSelector(selectGoodsFilter);
  const [formState, setFormState] = useState<FieldValues>({});
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const isEmptyFormFields = Object.values(formState).filter(
      (el) => el.length
    );

    if (!isEmptyFormFields.length) {
      dispatch(setGoodsFilter(false));
      return;
    } else {
      dispatch(setGoodsFilter(true));
    }
  }, [formState]);

  return (
    <>
      <form
        className={"filter"}
        onSubmit={handleSubmit((e) => setFormState(e))}
      >
        <label htmlFor="product">Product</label>
        <input type="text" id="product" {...register("product")} />
        <label htmlFor="brand">Brand</label>
        <input type="text" id="brand" {...register("brand")} />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          {...register("price", {
            valueAsNumber: true,
          })}
        />
        <input type="submit" value="Send" />
        <input type="submit" value="Clear" onClick={() => reset()} />
      </form>
      <div className={"goods__list"}>
        <Suspense fallback={<p>Loading...</p>}>
          {!goodsFilter ? (
            <GetGoods
              requestAction={"get_ids"}
              payload={{
                ids: ["1789ecf3-f81c-4f49-ada2-83804dcc74b0"],
                limit,
                offset,
              }}
            />
          ) : (
            <GetGoods requestAction={"filter"} payload={formState} />
          )}
        </Suspense>
      </div>
      <Pagination />
    </>
  );
}
