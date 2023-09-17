import { createDate } from "./createDate"

export const getMonthNameList = (selecteYear: number) => {
	const monthNamelist: {
		monthName: string,
		monthShort: string,
		monthIndex: number,
		date: Date,
		year: number
	}[] = Array.from({length:16})

	const d = new Date()
	
	for (let i=0; i < monthNamelist.length; i++) {
		const formatedDate = i < 12 
			? new Date(selecteYear, i, d.getDate()) 
			: new Date(selecteYear+1, i - 12, d.getDate())
	
		const {monthName, monthIndex, monthShort, date, year} = createDate(formatedDate)
		monthNamelist[i] = { monthName, monthIndex, monthShort, date, year}
	}
	return monthNamelist
}