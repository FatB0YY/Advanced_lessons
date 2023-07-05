let runningReaction = null

const obj = reactive({
  a: 0,
  b: 0,
})

autoRun(() => {
  let d = obj.a + 1
  console.log('d =', d)
})

autoRun(() => {
  let c = obj.b * obj.a
  console.log('c =', c)
})

function reactive(obj) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    let value = val
    // сет зависимостей, чтобы не было повторений
    const deps = new Set()
    Object.defineProperty(acc, key, {
      get() {
        if (runningReaction && !deps.has(runningReaction)) {
          deps.add(runningReaction)
        }
        return value
      },
      set(newValue) {
        if (hasChanged(value, newValue)) {
          value = newValue
          // вызываем каждый элемент, добавленный в список зависимостей
          deps.forEach((f) => f())
        }
      },
      enumerable: true,
    })
    return acc
  }, {})
}

function hasChanged(value, newValue) {
  return value !== newValue && (value === value || newValue === newValue)
}

function autoRun(fn) {
  runningReaction = fn
  fn()
  runningReaction = null
}

// Class
class Dependency {
  constructor() {
    this.deps = new Set()
  }

  depend() {
    if (runningReaction && !this.deps.has(runningReaction)) {
      this.deps.add(runningReaction)
    }
  }

  notify() {
    this.deps.forEach((f) => f())
  }
}

// вторая реализация
function reactive(obj) {
  Object.keys(obj).forEach((key) => {
    const dep = new Dependency()
    let value = obj[key]

    Object.defineProperty(obj, key, {
      get() {
        dep.depend()
        return value
      },
      set(newValue) {
        if (hasChanged(value, newValue)) {
          value = newValue
          dep.notify()
        }
      },
      enumerable: true,
    })
  })
  return obj
}
