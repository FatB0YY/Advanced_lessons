const user = {
  name: 'John',
  skills: ['JavaScript'],
  bith: new Date('1995-01-01'),
}

const userCopy1 = { ...user }
const userCopy2 = Object.assign({}, user)
const userCopy3 = Object.create(user)
const userCopy4 = JSON.parse(JSON.stringify(user))
const userCopy5 = structuredClone(user)

userCopy1.skills.push('React')
userCopy2.skills.push('React')
userCopy3.skills.push('React')
userCopy4.skills.push('Vue') // можем мутировать
userCopy5.skills.push('Angular') // можем мутировать

console.log('userCopy1.skills', userCopy1.skills) //  ["JavaScript", "React"]
console.log('user.skills', user.skills) //  ["JavaScript", "React", "React", "React"] !
console.log('userCopy4.skills', userCopy4.skills)

console.log('userCopy4.bith', userCopy4.bith.getDate()) // userCopy4.bith.getDate is not a function
console.log('userCopy5.bith', userCopy5.bith.getDate()) // работает !

// однако мы не можем хранить:
// 1. функции
// 2. DOM elements
// 3. методы у класса
