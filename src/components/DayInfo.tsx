import { FC } from "react";
import { createDate } from "../functions/createDate";
import img from '../imgs/pngExample.png'

interface DayInfoProps {
	selectedDate: Date
}

export const DayInfo: FC<DayInfoProps> = ({selectedDate}) => {
	const date = createDate(new Date(selectedDate))
	const dateTemplate = `${('0' + date.dayNumber).slice(-2)}.${('0' + date.monthNumber).slice(-2)}.${date.yearShort}`
	
	return(
		<div className="dayInfo">
			<h1 className="dayInfo__header">{dateTemplate}</h1>
			<div className="dayInfo__body">
				<p>Международный день биодизеля</p>
				<img src={img} alt="InfoOfDay" />
			</div>
		</div>
	)
}