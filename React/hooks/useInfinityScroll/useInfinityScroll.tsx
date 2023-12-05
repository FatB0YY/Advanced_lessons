import { MutableRefObject, useEffect, useRef } from "react";

export interface UseInfinityScrollProps {
  // ф-ция вызывается, когда мы пересекли элемент X
  callback?: () => void;
  // X элемент, который вызывает callback
  triggerRef: MutableRefObject<HTMLElement>;
  // сам wrapper, внутри которого находится скролл (иногда сам документ, когда скролл глобальный на всю стр)
  wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfinityScroll({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfinityScrollProps) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const triggerElement = triggerRef.current;
    const wrapperElement = wrapperRef.current;

    if (callback) {
      const options = {
        // эл, в котором находится скролл
        root: wrapperElement,
        rootMargin: "0px",
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        // будет вызываться когда на экране появился тот эл, за которым мы следим

        // отрабатывает только когда появляется в зоне видимости
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerElement);

      // избегаем утечки памяти
      return () => {
        if (observer && triggerElement) {
          observer.unobserve(triggerElement);
        }
      };
    }
  }, [triggerRef, wrapperRef, callback]);
}

// если бы мы использовали observer еще и в другом хуке, например useCallback,
// тогда надо было бы вынести его в ref, чтобы иметь глобально к нему доступ
