// из примера useWindowEvent и формой, мы используем рефы с функциями
// если мы знаем это, то можно использовать более четкую абстракцию.

import React, { useCallback, useLayoutEffect, useRef } from "react";

// ф-ция принимает только ф-цию
export function useEvent<T extends (...args: any[]) => any>(fn: T) {
  // заворачиваем в useреф
  const fnRef = useRef(fn);

  // каждый раз когда меняется fn, обновляем реф
  useLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // тк мы знаем, что в рефе хранится ф-ция, делаем удобную обертку
  const eventCb = useCallback(() => {
    (...args: Parameters<T>) => {
      return fnRef.current.apply(null, args);
    };
    // fnRef будет создан только один раз, поэтому
    // eventCb будет иметь одну и ту же ссылку.
  }, [fnRef]);

  return eventCb;
}
