import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { useEvent } from "./useEvent";

// function useLatest<Value>(value: Value) {
//   const valueRef = useRef(value);

//   useLayoutEffect(() => {
//     valueRef.current = value;
//   }, [value]);

//   return valueRef;
// }

type GetWindowEvent<Type extends string> = Type extends keyof WindowEventMap
  ? WindowEventMap[Type]
  : Event;

// зачем overload (перегрузка) ф-ции?
// он нужен для тех кейсов, где есть специфичный event. mouseEvent это подип Event
function useWindowEvent<Type extends string>(
  type: Type,
  cb: (event: GetWindowEvent<Type>) => void
): void;

// принимает тип ивента, cb и навешивает листенер на window. При unmount удаляем обработчик
function useWindowEvent(type: string, cb: (event: Event) => void) {
  // зачем здесь callback ? Этот колбэк передает разработчик и он может быть не мемоизирован.
  // но даже если он мемо, там все равно может быть завязка на некоторые стейты.
  // const latestCb = useLatest(cb);

  // с !!! useEvent !!!
  const eventCb = useEvent(cb);

  useEffect(() => {
    // обретка нужна чтобы latestCb.current(event) была актуальна.
    // очень важная деталь.
    // const handler = (event: Event) => {
    //   latestCb.current(event);
    // };

    // window.addEventListener(type, handler);
    window.addEventListener(type, eventCb);

    // return () => window.removeEventListener(type, handler);
    return () => window.removeEventListener(type, eventCb);
    // без useLatest: при каждом обновлении callback,
    // будет удаляться и добавляться новый обработчик, это неправильно
    // с useLatest мы получаем ref и используем в deps'ах.
    // и поэтому он будет вызван только один раз.
    // }, [type, latestCb]);

    // c useEvent нам сразу передается замемоизированный evenCb
  }, [type, eventCb]);
}

export function UseWindowEventExample() {
  const [{ x, y, diffX, diffY }, setMousePosition] = useState({
    x: 0,
    y: 0,
    diffX: 0,
    diffY: 0,
  });

  // при каждом изменении стейте, будет обновляться колбэк
  // но ререндеров не будет.
  useWindowEvent("mousemove", (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
      diffX: e.clientX - x,
      diffY: e.clientY - y,
    });
  });

  return (
    <div>
      <h4>mouse position</h4>
      X: {x}
      Y: {y}
      <h4>Diff from prev position</h4>
      X: {diffX}
      Y: {diffY}
    </div>
  );
}
