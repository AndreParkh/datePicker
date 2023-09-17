import { createMonth } from './createMonth';
import { getQtyDaysOfMonth } from "./getQtyDaysOfMonth"

interface GetShownParams {
	month: ReturnType<typeof createMonth>,
	year: number,
}

export const getShownDayList = ({month, year}: GetShownParams) => {
	const qtyDaysOfMonth = getQtyDaysOfMonth(month.monthIndex, year)
	
	const prevMonthDayList = createMonth(new Date(year, month.monthIndex-1)).createMonthDayList()
	const nextMonthDaylist = createMonth(new Date(year, month.monthIndex+1)).createMonthDayList()
	const dayList = createMonth(new Date(year, month.monthIndex)).createMonthDayList()
	
	const firstDay = dayList[0]
	const lastDay = dayList[qtyDaysOfMonth - 1]

	const shiftIndex = 1 // сдвиг для начала недели с понедельника
	
	const condition =  firstDay.dayOfWeekNumber - 1 -shiftIndex < 0

	const qtyPrevDays = condition 
		? 7 -(2 - firstDay.dayOfWeekNumber) //2 - обозначение понедельника в недели
		: firstDay.dayOfWeekNumber - 1 - shiftIndex
		
	const qtyNextDays = 7 - lastDay.dayOfWeekNumber + shiftIndex > 6
		? 7 - lastDay.dayOfWeekNumber - (7 - shiftIndex)
		: 7 - lastDay.dayOfWeekNumber + shiftIndex
		// console.log('qty', qtyPrevDays)

	const result = []
	
	for (let i=0; i< qtyPrevDays; i++) {
		const index = qtyPrevDays - i
		result.push(prevMonthDayList[prevMonthDayList.length - index])
	}

	for (let i=0; i< qtyDaysOfMonth; i++) {
		result.push(dayList[i])
	}

	for (let i=0; i< qtyNextDays; i++) {
		result.push(nextMonthDaylist[i])
	}

	return result
}