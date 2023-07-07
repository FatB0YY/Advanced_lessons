function filterNumbersNotOptimal(array) {
  return array
    .filter((item) => item % 2 === 0) // O(N) cpu + memory
    .map((item) => item * 2) // O(N) cpu + memory
    .filter((item) => item > 1_000) // O(N) cpu + memory
  // проблема: создалось два ненужных массива, три итерации
}

// одна итерация, один доп массив, который нужен
function filterNumbersOptimal(array) {
  const filteredArray = []

  array.forEach((item) => {
    if (item % 2 === 1) {
      return
    }

    const multiplied = item * 2

    if (multiplied < 1_000) {
      return
    }

    filteredArray.push(item)
  })

  return filteredArray
}

// квадратичное время и память
function flattenOneNotOptimal(arrays) {
  // очень плохо очень. concat внутри циклов
  return arrays.reduce((result, array) => result.concat(array), [])
}

function flattenOneOptimal(arrays) {
  let result = []

  for (let i = 0; i < arrays.length; i++) {
    for (let j = 0; j < arrays[i].length; j++) {
      result.push(arrays[i][j])
    }
  }

  return result
}

// три итерации и 2 ненужных массива
function updateObjectValuesNotOpyimal(object) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, value * 2])
  )
}

function updateObjectValuesOpyimal(object) {
  const newObject = {}

  for (const key in object) {
    newObject[key] = object[key] * 2
  }

  return newObject
}
