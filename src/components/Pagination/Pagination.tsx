// store
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setOffset } from "../../store/reducer";
import { selectOffset } from "../../store/selectors";

export default function Pagination() {
  const offset = useAppSelector(selectOffset);
  const dispatch = useAppDispatch();

  const paginLength = 9;
  const shiftInPagin = offset - Math.ceil(paginLength / 2) + 1;

  const allPaginNumber = Array.from(
    { length: paginLength },
    (_, i) => i + (offset > 5 ? shiftInPagin : 1)
  );

  return (
    <ul className={"pagination"}>
      <li className={"pagination__btn"}>
        <button onClick={() => dispatch(setOffset(offset - 1))}>Prev</button>
      </li>
      {allPaginNumber.map((el, i) => (
        <li
          className={"pagination__item"}
          onClick={() => dispatch(setOffset(el))}
          key={el + i * 2.5}
        >
          {el}
        </li>
      ))}
      <li className={"pagination__btn"}>
        <button onClick={() => dispatch(setOffset(offset + 1))}>Next</button>
      </li>
    </ul>
  );
}
