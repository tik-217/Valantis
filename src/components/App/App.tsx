// react
import { Suspense, lazy, useState } from "react";

// components
const Pagination = lazy(() => import("../Pagination/Pagination"));
const GetGoods = lazy(() => import("../GetGoods/GetGoods"));

// react-hook-form
import { useForm } from "react-hook-form";

// types
import { IGoodsProps } from "../../types";

// styles
import "./App.css";

export default function App() {
  const [form, setForm] = useState<IGoodsProps>({
    product: "",
    brand: "",
    price: 0,
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      product: "",
      brand: "",
      price: 0,
    },
  });

  return (
    <>
      <form className={"filter"} onSubmit={handleSubmit(setForm)}>
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
      </form>
      <div className={"goods__list"}>
        <Suspense fallback={<p>Loading...</p>}>
          <GetGoods submit={form} />
        </Suspense>
      </div>
      <Pagination />
    </>
  );
}
