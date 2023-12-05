import React, {
  memo,
  useCallback,
  useState,
  useRef,
  useLayoutEffect,
} from "react";

function useLatest<Value>(value: Value) {
  // результатом useRef'а является ссылка на один и тот же объект
  // и соотвественно поэтому можно его не прокидывать в deps useCallback'а

  const valueRef = useRef(value);

  // с useLayoutEffect у нас не может быть ситуаций, когда
  // в рефе будет неактуальное знач
  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}

// кнопка не использует стейт "text". Ей нужен только onClick
// и т.к onClick использует стейт text, onClick постоянно обновляется.
//
// нельзя просто так убрать text из зависимостей, тк будет старое знач. в замыкании.
// Из-за того что обновляется onClick, ломается мемоизация Button. (в реальном прилож. может быть большой комп.)

const Button = () =>
  memo(({ textbtn, onClick }) => {
    console.log("button is rendered");
    return <button onClick={onClick}>{textbtn}</button>;
  });

const App = () => {
  const [text, setText] = useState("");
  const latestText = useLatest(text);

  // несмотря на то, что ф-ция внутри useCallback каждый раз будет создаваться заново,
  // если массив deps’ов не поменялся, useCallback вернет старую ф-цию.
  // по сути новая ф-ция будет создана, но она просто соберется garbage.collect()
  const onClick = useCallback(() => {
    console.log("save text:", latestText.current);
  }, [latestText]); // для eslint

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button textbtn="submit" onClick={onClick} />
    </div>
  );
};

export default App;

// Возможно пример слишком легким и можно было просто использовать useRef
// и передать его в ref  инпута. Тогда не понадобился бы самописный хук,
// useState и useCallback, а компонент получился бы на много компактнее и легче.
// Но например нам нужно иметь актуальное значение без прокидывания deps’ов. (хук useEventListener)
