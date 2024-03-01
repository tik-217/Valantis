// types
import { IGoodsProps } from "../../types";

export default function Goods({ id, name, cost, brand }: IGoodsProps) {
  return (
    <>
      <h3>Name: {name}</h3>
      <section>id: {id}</section>
      <section>brand: {brand ?? "none"}</section>
      <section>cost: {cost}</section>
    </>
  );
}
