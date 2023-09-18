import { FC, useState } from "react";
import { createDate } from "../functions/createDate";
import { getMonthNameList } from "../functions/getMonthNameList";
import { createMonth } from "../functions/createMonth";
import { getShownDayList } from "../functions/getShownDayList";
import { dayOfWeek } from "../constants";
import { checkDateIsEqual } from "../functions/checkDateIsEqual";
import { DayInfo } from "./DayInfo";
import { Arrow } from "./Arrow";

interface CalendarProps {
  selectedDate: Date;
  selectDate: (date: Date) => void;
}

export const Calendar: FC<CalendarProps> = ({
  selectedDate: date,
  selectDate,
}) => {
  const [mode, setMode] = useState<"days" | "monthes">("days");
  const [selectedDate, setSelectedDate] = useState(createDate(date));
  const [shownMonth, setShownMonth] = useState(
    createMonth(new Date(selectedDate.year, selectedDate.monthIndex)),
  );
  const [shownYear, setShownYear] = useState(selectedDate.year);
  const [isShownDayInfo, setIsShownDayInfo] = useState(false);

  const monthNameList = getMonthNameList(shownYear);
  const shownDayList = getShownDayList({ month: shownMonth, year: shownYear });

  const onClickArrow = (direction: "next" | "prev") => {
    if (mode === "days") {
      const monthIndex =
        direction === "next"
          ? shownMonth.monthIndex + 1
          : shownMonth.monthIndex - 1;

      if (monthIndex === -1) {
        const year = shownYear - 1;
        setShownYear(year);
        return setShownMonth(createMonth(new Date(year, 11)));
      }
      if (monthIndex === 12) {
        const year = shownYear + 1;
        setShownYear(year);
        return setShownMonth(createMonth(new Date(year, 0)));
      }
      return setShownMonth(createMonth(new Date(shownYear, monthIndex)));
    }

    if (mode === "monthes") {
      const year = direction === "next" ? shownYear + 1 : shownYear - 1;
      return setShownYear(year);
    }
  };

  const setSelectedMonthByIndex = (monthIndex: number) => {
    setShownMonth(createMonth(new Date(shownYear, monthIndex)));
  };

  return (
    <div className="calendar__wrapper">
      {isShownDayInfo && <DayInfo selectedDate={date} />}

      <div className="calendar__body">
        <div className="calendar__header">
          {mode === "days" && (
            <p
              onClick={() => {
                setMode("monthes");
                setIsShownDayInfo(false);
              }}
            >
              {monthNameList[shownMonth.monthIndex].monthName} {shownYear}
            </p>
          )}
          {mode === "monthes" && (
            <p onClick={() => setMode("days")}>{shownYear} год</p>
          )}
          <div className="calendar__header__arrows">
            <button
              onClick={() => onClickArrow("prev")}
              className="calendar__header__arrow_up"
            >
              <Arrow />
            </button>
            <button
              onClick={() => onClickArrow("next")}
              className="calendar__header__arrow_down"
            >
              <Arrow />
            </button>
          </div>
        </div>
        <div className="calendar__selectFild__body">
          {mode === "days" && (
            <>
              <div className="calendar__week__names">
                {dayOfWeek.map((weekDayName, idx) => (
                  <div key={idx}>{weekDayName}</div>
                ))}
              </div>
              <div className="calendar__days">
                {shownDayList.map((dayItem, idx) => {
                  const isSelectedDay = checkDateIsEqual(
                    dayItem.date,
                    selectedDate.date,
                  );
                  const isAdditionalDay =
                    dayItem.monthIndex !== shownMonth.monthIndex;
                  const dayInfoIsShown = isShownDayInfo && isSelectedDay;

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (isAdditionalDay)
                          setShownMonth(
                            createMonth(
                              new Date(dayItem.year, dayItem.monthIndex),
                            ),
                          );
                        setSelectedDate(dayItem);
                        selectDate(dayItem.date);
                        setIsShownDayInfo(!dayInfoIsShown);
                      }}
                      className={[
                        "calendar__day",
                        isAdditionalDay ? "calendar__additional__day" : "",
                        isSelectedDay ? "calendar__selected__item" : "",
                      ].join(" ")}
                    >
                      {dayItem.dayNumber}
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {mode === "monthes" && (
            <div className="calendar__pick__item__container">
              {monthNameList.map((monthItem, idx) => {
                const isSelectedMonth =
                  monthItem.monthIndex === selectedDate.monthIndex &&
                  monthItem.year === selectedDate.year;
                const isAdditionalMonth = monthItem.year !== shownYear;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (isAdditionalMonth) setShownYear(shownYear + 1);
                      setSelectedMonthByIndex(monthItem.monthIndex);
                      setMode("days");
                    }}
                    className={[
                      "calendar__pick__item",
                      isAdditionalMonth ? "calendar__additional__month " : "",
                      isSelectedMonth ? "calendar__selected__item" : "",
                    ].join(" ")}
                  >
                    {monthItem.monthShort}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
