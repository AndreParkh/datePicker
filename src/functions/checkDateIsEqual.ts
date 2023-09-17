export const checkDateIsEqual = (date1: Date, date2: Date) => {
	const IsDayEqual = date1.getDate() === date2.getDate()
	const IsMonthEqual = date1.getMonth() === date2.getMonth()
	const IsYearEqual = date1.getFullYear() === date2.getFullYear()

	return IsDayEqual && IsMonthEqual && IsYearEqual
}
