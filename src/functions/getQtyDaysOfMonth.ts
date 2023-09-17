export const  getQtyDaysOfMonth = (
	monthIndex: number,
	year: number = new Date().getFullYear()
) => new Date(year, monthIndex + 1, 0).getDate()