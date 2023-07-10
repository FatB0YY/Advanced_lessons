import React from 'react'
import { useEffect, useLayoutEffect, useReducer } from 'react'

export const App = () => {
  const [num, triggerRerender] = useReducer((v) => v + 1, 0)

  ;(window as any).triggerRerender = triggerRerender

  console.log('parent: render 1')

  useLayoutEffect(() => {
    console.log('parent: layout effect 2')
    return () => {
      console.log('parent: cleanup layout effect 3')
    }
  }, [num])

  useEffect(() => {
    console.log('parent: effect 4')
    return () => {
      console.log('parent: cleanup effect 5')
    }
  }, [num])

  return <Child num={num} />
}

const Child = ({ num }: { num: number }) => {
  console.log('child: render 6')

  useLayoutEffect(() => {
    console.log('child: layout effect 7')
    return () => {
      console.log('child: cleanup layout effect 8')
    }
  }, [num])

  useEffect(() => {
    console.log('child: effect 9')
    return () => {
      console.log('child: cleanup effect 10')
    }
  }, [num])

  return null
}

// parent: render 1
// child: render 6
// child: layout effect 7
// parent: layout effect 2
// child: effect 9
// parent: effect 4

// triggerRerender() -------------
// parent: render 1
// child: render 6
// child: cleanup layout effect 8
// parent: cleanup layout effect 3
// child: layout effect 7
// parent: layout effect 2
// child: cleanup effect 10
// parent: cleanup effect 5
// child: effect 9
// parent: effect 4

/*
И так разберем почему так. Функциональные компоненты - это ф-ции, которые возвращают JSX.
И так как это обычные фу-ции, то логи 1 и 6 (parent|child render) произойдут синхронно один за другим. Сначала вызовется App, тк это более верхний компонент, и когда получится результат jsx, то есть дочернего компонента, выполнится child. ОДНАКО child не будет вызван повторно, если есть memo или передаваемые пропсы не поменялись.

Почему потом вызывается child layout effect и parent layout effect ? Многие думают, что раз родительская функция вызывается первой, то и ее эффекты будут вызываться первыми, но это не так.

Поговорим про то, когда вызывается useLayoutEffect. Он вызывается тогда, когда уже react заменил прошлый virtual dom, новым virtual dom, посмотрел какие обновление ему нужно сделать и произвел эти обновления на самих DOM элементах. 
И сразу же после этого синхронно он вызывает layout effectы. Соответственно в этот момент, когда он вызывал use layout effectы. Человек еще не увидел в браузере обновленный скелет, все это происходит синхронно. 
У react логика такая: child компонент моунтится раньше чем parent компонент. Сначала child component, потом parent component ! Логично, чтобы замоунтился parent компонент, нужно чтобы сначала замоунтелись child компоненты.  Лучше использовать его, когда требуется манипулировать DOM или измерить размеры элементов.


с useEffectами обычными логика такая же, когда вызывается обычный useEffect, он вызывается асинхронно. Получается произошел render в dom, dom обновился, но человек еще не успел увидеть обновленный скрин. Потом вызывается useLayout effect и потом асинхронно, через какое то время useEffect.
Условно через какой то асинхронный период вызовется useEffect. Он вызовется после того как пользователь увидит экран (обновленный)!

Логика такая же, сначала вызовется child effect, потому что он замоунтился первый, а потом parent effect. 

cleanUp effect вызываются перед тем, как заново вызвать эффекты, например чтобы почистить там сайд эффекты прошлого эффекта.


---
В React есть два хука, useLayoutEffect и useEffect, которые позволяют выполнять побочные эффекты в функциональных компонентах. Оба хука похожи, но имеют некоторые различия.

1. useLayoutEffect:
	- Вызывается синхронно после завершения рендера компонента и перед тем, как браузер обновит экран.
	- Подобно componentDidMount и componentDidUpdate в классовых компонентах.
	- Используется для выполнения синхронных операций, которые должны быть завершены перед отображением изменений на экране.
	- Лучше использовать его, когда требуется манипулировать DOM или измерить размеры элементов.
2. useEffect:
	- Вызывается асинхронно после завершения рендера компонента и обновления DOM.
	- Подобно componentDidMount, componentDidUpdate и componentWillUnmount в классовых компонентах.
	- Используется для выполнения асинхронных операций, таких как получение данных из API или изменение состояния компонента.
	- Чаще всего используется для обработки побочных эффектов, которые не требуют манипуляции DOM.

Относительно запросов, следует помнить, что useLayoutEffect вызывается синхронно и может блокировать отображение изменений на экране, поэтому не рекомендуется выполнять в нём длительные операции или запросы к серверу. Они могут вызвать задержку в отображении пользователю.

С другой стороны, useEffect вызывается асинхронно и не блокирует отображение. Поэтому в нём можно выполнять асинхронные операции, включая запросы к серверу.
*/
