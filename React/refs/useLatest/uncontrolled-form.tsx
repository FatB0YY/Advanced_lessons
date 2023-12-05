import React, {
  useState,
  useCallback,
  memo,
  useRef,
  useLayoutEffect,
} from "react";

type ValueType = {
  state1: string;
  state2: string;
};

function useLatest<Value>(value: Value) {
  const valueRef = useRef(value);

  useLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}

export function UncontrolledFormComponentProblem() {
  const [state1, setState1] = useState("");
  const [state2, setState2] = useState("");

  const latestRef = useLatest<ValueType>({ state1, state2 });

  // // инициализируем нашими стейтами (не влияет на знач. ref'а при след ререндерах)
  // const stateRef = useRef({ state1, state2 });
  // // при каждом ререндере обновляем значение рефа (мутируем)
  // stateRef.current = { state1, state2 };

  const handleSubmit = useCallback(() => {
    sendSomeRequest({
      //   state1: state1,
      //   state2: state2,
      state1: latestRef.current.state1,
      state2: latestRef.current.state2,
    });
    //   }, [state1, state2]);
    // Независимо от изменений стейта и ререндера, ссылка останется неизменной рефа
  }, [latestRef]);

  return (
    <UncontrolledFormComponent
      onSubmit={handleSubmit}
      onState1Change={setState1}
      onState2Change={setState2}
    />
  );
}

interface UncontrolledFormComponentProps {
  onSubmit: (event: React.FormEvent) => void;
  onState1Change: (value: string) => void;
  onState2Change: (value: string) => void;
}

// Это мемо компонент. То есть onState1Change, onState2Change onSubmit,
// не должны никогда меняться.
// Однако handleSubmit завернут в useCallback, который завязан на два стейта
// state1 и state2. Поэтому на каждое изменение инпута будет ререндер
const UncontrolledFormComponent = memo(function UncontrolledFormComponent({
  onSubmit,
  onState1Change,
  onState2Change,
}: UncontrolledFormComponentProps) {
  console.log("render");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => onState1Change(e.target.value)} />
      <input type="text" onChange={(e) => onState2Change(e.target.value)} />
    </form>
  );
});

function sendSomeRequest({ state1, state2 }: ValueType) {
  console.log(state1, state2);
}
