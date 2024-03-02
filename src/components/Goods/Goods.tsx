// types
import { IGoodsProps } from "../../types";

export default function Goods({ id, product, price, brand }: IGoodsProps) {
  return (
    <>
      <h3>Name: {product}</h3>
      <section>id: {id}</section>
      <section>brand: {brand ?? "none"}</section>
      <section>cost: {price}</section>
    </>
  );
}
