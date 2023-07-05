let runningReaction = null

const state = reactive({
  cell1: 0,
  cell2: 1,
})

function reactive(obj) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    let value = val
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

const button = document.getElementById('button')
const cell1 = document.getElementById('cell1')
const cell2 = document.getElementById('cell2')

button.addEventListener('click', () => {
  state.cell2 += 1
})

autoRun(() => {
  cell1.innerHTML = state.cell1
})

autoRun(() => {
  cell2.innerHTML = state.cell2

  // Добавляем обновление cell1 при изменении cell2
  state.cell1 = state.cell2 * 10
})
