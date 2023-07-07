const array = [1, 2, 3, 4]
const object = {
  a: 1,
  b: 2,
  c: 'rfrf',
}

// COPY
const copy1 = {
  ...object,
}

// mutates 1st object
const copy2 = Object.assign({}, object)

const copy3 = [...array]
const copy4 = array.slice()
const copy5 = array.concat([])

function immutableCopyArray(array) {
  const newArray = []

  for (let i = 0; i < array.length; i++) {
    newArray[i] = array[i]
  }

  return newArray
}

function immutableCopyObject(object) {
  const newRecord = {}

  for (const key in object) {
    newRecord[key] = object[key]
  }

  return newRecord
}

// iterate
const filtered = array.filter((item) => item > 0)
const mapped = array.map((item) => item * 1)

// создаст новый массив!из ключей объекта
Object.keys(object).forEach((key) => {
  console.log(key, object[key])
})

// создаст новый массив!со значениями объекта
Object.values(object).forEach((value) => {
  console.log(value)
})

// создаст новый массив массиво!
Object.entries(object).forEach(([key, value]) => {
  console.log(key, value)
})

// проблема: лишние массивы

for (const key in object) {
  const value = object[key]
  console.log(key, value)
}
