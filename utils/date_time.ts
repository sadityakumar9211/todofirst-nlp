const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const day:string = days[new Date().getDay()]
const date: number = new Date().getDate()
const time: string = new Date().toLocaleTimeString().slice(0,5)


export {day, date, time}