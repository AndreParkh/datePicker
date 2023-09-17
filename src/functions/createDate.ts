import { locale } from './../constants';


export const createDate = (date: Date = new Date()) => {

	const dayNumber = date.getDate()
	const dayOfWeekNumber = date.getDay() + 1
	const dayOfWeek = date.toLocaleDateString(locale, {weekday: 'short'})
	
	const year = date.getFullYear()
	const yearShort = date.toLocaleDateString(locale, {year: '2-digit'})
	
	const monthName = date.toLocaleDateString(locale, {month: 'long'})
	const monthShort = monthName.slice(0,3)
	const monthNumber = date.getMonth() + 1
	const monthIndex = date.getMonth()

	return {
		date,
		dayNumber,
		dayOfWeekNumber,
		dayOfWeek,
		year,
		yearShort,
		monthName,
		monthShort,
		monthNumber,
		monthIndex,
	}
}