import { createDate } from "./createDate"
import { getQtyDaysOfMonth } from "./getQtyDaysOfMonth"

export const createMonth = (date: Date) => {

	const dateObject = createDate(date)
	const {monthName, year, monthNumber, monthIndex} = dateObject

	const getDay = (dayNumber: number) => createDate(new Date(year, monthIndex, dayNumber))
		
	const createMonthDayList = () => {
		const dayList = []

		for (let i=0; i <= getQtyDaysOfMonth(monthIndex,year)-1; i++) {
			dayList[i] = getDay(i+1)
		}
		
		return dayList
	}

	return {
		getDay,
		monthName,
		monthIndex,
		monthNumber,
		year,
		createMonthDayList
	}
}
