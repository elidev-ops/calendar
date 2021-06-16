const headerElm = document.querySelector('.calendar-header__content')
const weekdaysElm = document.querySelector('.calendar-weekdays')
const daysElm = document.querySelector('.calendar-daysnumber')
const yearElm = document.querySelector('.calendar-year')
const nextBtn = document.querySelector('[data-js="next"]')
const prevBtn = document.querySelector('[data-js="prev"]')

const dateMain = new Date()

let active = dateMain.getMonth()
let initial = headerElm.clientWidth * (active)

const getLocaleString = (cfg, role, length) => {
  const arrMap = (_, index) => {
    const year = cfg.year ? dateMain.getFullYear() : 0
    const month = cfg.month ? index + 1 : 0
    const day = cfg.day ? index : 0

    const date = new Date(year, month, day)

    return date.toLocaleString('pt-BR', role)
  }
  return Array.from({ length }, arrMap)
}

const weekDaysName = getLocaleString({ day: true }, { weekday: 'short' }, 7)
  .reduce((acc, cur) => acc += `<span>${cur.replace('.', '')}</span>`, '')

const monthsName = getLocaleString({ month: true }, { month: 'long' }, 12)
  .reduce((acc, cur) => acc += `<span>${cur}</span>`, '')


const init = (() => {
  headerElm.innerHTML = monthsName
  weekdaysElm.innerHTML = weekDaysName
  setInterval(() => {
    const date = new Date()
    yearElm.innerHTML = `<span>${date.getHours()}:${date.getMinutes()}</span><span>${date.getFullYear()}</span>`
  }, 1000)
})()
const headerItens = document.querySelectorAll('.calendar-header__content > *')

const nextMonth = () => {
  const { clientWidth } = headerElm
  if (initial < (clientWidth * (headerItens.length - 1))) {
    initial += clientWidth
    active++
    headerItens.forEach(item => {
      item.style.transform = `translate3d(-${initial}px, 0, 0)`
    })
  }
  getDaysFromMonth(active)
}

const prevMonth = () => {
  const { clientWidth } = headerElm
  if (initial > 0) {
    initial -= clientWidth
    active--
    headerItens.forEach(item => {
      item.style.transform = `translate3d(-${initial}px, 0, 0)`
    })
  }
  getDaysFromMonth(active)
}

prevBtn.addEventListener('click', prevMonth)
nextBtn.addEventListener('click', nextMonth)

const getDaysFromMonth = (month) => {
  const firstDayOfMonth = new Date(dateMain.getFullYear(), month, 1).getDay() - 1
  const lastDayThisMonth = new Date(dateMain.getFullYear(), month+1, 0).getDate()
  const days = []
  for (let i = -firstDayOfMonth; i < (42 - firstDayOfMonth); i++) {
    const date = new Date(dateMain.getFullYear(), month, i)
    days.push({last: i, day: date.getDate()})
  }
  const daysHTML = days.reduce((acc, {last, day}) => acc += `<li ${last < 1 || last > lastDayThisMonth ? 'class="last-month"': ''} ${day === dateMain.getDate() && active === dateMain.getMonth() ? 'class="active"': ''}>${day}</li>`, '')
  daysElm.innerHTML = daysHTML
}

headerItens.forEach(item => {
  item.style.transform = `translate3d(-${initial}px, 0, 0)`
})
getDaysFromMonth(active)
